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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwner = exports.enableOwner = exports.updateOwner = exports.newOwner = void 0;
const connection_1 = require("../../connection/connection");
const sendMail_1 = require("../../utils/middelware/sendMail");
const newOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { status: false, deleted: false, vehiclesId: [], createdAt: new Date(Date.now()).toISOString() });
        const snapshot = yield connection_1.db.collection("owner").where("cc", "==", dataFormated.cc).get();
        if (!snapshot.empty) {
            throw new Error("El Cc ya está registrado");
        }
        const docRef = yield connection_1.db.collection("owner").add(dataFormated);
        yield (0, sendMail_1.successOwnerRegister)(dataFormated.email, dataFormated.displayName);
        res.status(201).json({ id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear el propietario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.newOwner = newOwner;
const updateOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection("owner").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el propietario");
        }
        yield connection_1.db
            .collection("owner")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Propietario actualizado correctamente" });
    }
    catch (innerError) {
        console.error("Error al actualizar el propietario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.updateOwner = updateOwner;
const enableOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("owner").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontrón el propietario");
        }
        yield connection_1.db.collection("owner").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Propietario habilitado correctamente" });
    }
    catch (innerError) {
        console.error("Error al habilitar el propietario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.enableOwner = enableOwner;
const deleteOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("owner").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el propietario");
        }
        yield connection_1.db.collection("owner").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Propietario eliminado correctamente" });
    }
    catch (innerError) {
        console.error("Error al eliminar el propietario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.deleteOwner = deleteOwner;
