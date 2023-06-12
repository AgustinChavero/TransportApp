"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodingUser = exports.allUsers = exports.searchUser = void 0;
const connection_1 = require("../../connection/connection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const searchUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("users").doc(id).get();
        if (!doc.exists) {
            throw (0, http_errors_1.default)(404, "El usuario no existe");
        }
        else {
            const usuario = Object.assign({ id: doc.id }, doc.data());
            res.status(200).json(usuario);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.searchUser = searchUser;
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        let usersRef = connection_1.db.collection("users");
        //let deletedFilter = false; // Valor predeterminado de deleted en false
        if (Object.keys(req.query).length > 2) {
            const filters = Object.keys(req.query).filter((key) => key !== "page" && key !== "pageSize");
            filters.forEach((key) => {
                usersRef = usersRef.where(key, "==", req.query[key]);
                // if (key === "deleted") {
                //   // Si se proporciona el parámetro "deleted" en la consulta, se sobrescribe el valor predeterminado
                //   deletedFilter = req.query.deleted === "true";
                // } else {
                //   usersRef = usersRef.where(key, "==", req.query[key]);
                // }
            });
        }
        //usersRef = usersRef.where("deleted", "==", deletedFilter);
        const totalUsersSnapshot = yield usersRef.get();
        if (totalUsersSnapshot.empty) {
            throw (0, http_errors_1.default)(404, "No hay usuarios registrados");
        }
        const totalFilteredUsers = totalUsersSnapshot.size;
        const totalPages = Math.ceil(totalFilteredUsers / pageSize);
        const usersSnapshot = yield usersRef.limit(endIndex).get();
        const usersData = usersSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.json({ users: usersData, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.allUsers = allUsers;
const decodingUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization.slice(7);
        const decoded = jsonwebtoken_1.default.verify(token, "clavemegasecreta");
        const doc = yield connection_1.db.collection("users").doc(decoded.id).get();
        if (!doc.exists) {
            throw (0, http_errors_1.default)(404, "Usuario no encontrado");
        }
        else {
            const usuario = Object.assign({ id: doc.id }, doc.data());
            res.json(usuario);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.decodingUser = decodingUser;
