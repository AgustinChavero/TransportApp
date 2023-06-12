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
exports.deleteLocal = exports.enableLocal = exports.updateLocal = exports.newLocal = void 0;
const connection_1 = require("../../connection/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Controlador para crear un local en Firestore.
 */
const newLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { history: [], status: false, deleted: false, bankAccount: {
                bankHolder: "",
                accountNumber: "",
            }, createdAt: new Date(Date.now()).toISOString() });
        // Encriptar la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(dataFormated.password, 10);
        dataFormated.password = hashedPassword;
        const docRef = yield connection_1.db.collection("locals").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        try {
            throw new Error(error.message);
        }
        catch (innerError) {
            console.error("Error al crear el local", innerError);
            res.status(400).json({ message: innerError.message });
        }
    }
});
exports.newLocal = newLocal;
const updateLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Obtener ID del local a actualizar
        const data = req.body; // Obtener datos actualizados del local
        const updatedAt = new Date(Date.now()).toISOString();
        // Verificar si el local existe en Firestore
        const docRef = yield connection_1.db.collection("locals").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el local");
        }
        // Actualizar el local en Firestore
        yield connection_1.db
            .collection("locals")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Local actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el local", error);
        res.status(400).json({ message: error.message });
    }
});
exports.updateLocal = updateLocal;
const enableLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("locals").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El local no se encontró");
        }
        yield connection_1.db.collection("locals").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Local habilitado correctamente" });
    }
    catch (innerError) {
        console.error("Error al habilitar el local", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.enableLocal = enableLocal;
const deleteLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("locals").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El local no se eliminó");
        }
        yield connection_1.db.collection("locals").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Local eliminado correctamente" });
    }
    catch (innerError) {
        console.error("Error al eliminar el local", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.deleteLocal = deleteLocal;
