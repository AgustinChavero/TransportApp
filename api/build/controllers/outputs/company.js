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
exports.getCompanyByName = exports.getCompanies = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
const getCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = connection_1.db.collection("companies");
        const companySnap = yield query.get();
        if (companySnap.empty) {
            throw (0, http_errors_1.default)(404, "No se encontraron companias");
        }
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(companySnap.docs.length / pageSize);
        const companies = companySnap.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ companies, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.getCompanies = getCompanies;
const getCompanyByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("companies").doc(id).get();
        if (!doc.exists) {
            throw (0, http_errors_1.default)(404, "No se encontro la compania");
        }
        else {
            const company = Object.assign({ id: doc.id }, doc.data());
            res.json(company);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getCompanyByName = getCompanyByName;
