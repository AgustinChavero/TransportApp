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
exports.updateCompany = exports.newCompany = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
const newCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { rating: 0, createdAt: new Date(Date.now()).toISOString() });
        const docRef = yield connection_1.db.collection("companies").add(dataFormated);
        res.status(200).json({ message: "Compañia creado correctamente", id: docRef.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newCompany = newCompany;
const updateCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection("companies").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontró el usuario");
        }
        yield connection_1.db
            .collection("companys")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Compañia actualizado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCompany = updateCompany;
