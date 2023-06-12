"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPassageValidate = void 0;
const validators_1 = require("./validators");
const http_errors_1 = __importDefault(require("http-errors"));
const newPassageValidate = (req, res, next) => {
    try {
        // const data = req.body;
        const dataString = req.body.data; // Solo usar cuando se necesite probar con insomia Obtener la cadena JSON de la solicitud
        const data = JSON.parse(dataString); // Solo usar cuando se necesite probar con insomia
        const { error } = (0, validators_1.validateNewPassage)(data);
        if (error) {
            throw (0, http_errors_1.default)(400, error.message);
        }
        next();
    }
    catch (error) {
        next(error); // Pasar el error al siguiente middleware
    }
};
exports.newPassageValidate = newPassageValidate;
