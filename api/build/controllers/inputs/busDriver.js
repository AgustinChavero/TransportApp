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
exports.updateBusDriver = exports.newBusDriver = void 0;
const connection_1 = require("../../connection/connection");
/**
 * Controlador para crear Bus Driver
 * * @body datos para crear Bus Driver
 */
const newBusDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false });
        const snapshot = yield connection_1.db
            .collection("busDriver")
            .where("cc", "==", dataFormated.cc)
            .get();
        if (!snapshot.empty) {
            throw new Error("El conductor ya está registrado");
        }
        const docRef = yield connection_1.db.collection("busDriver").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        try {
            throw new Error(error.message);
        }
        catch (innerError) {
            console.error("Error al crear el conductor", innerError);
            res.status(400).json({ message: innerError.message });
        }
    }
});
exports.newBusDriver = newBusDriver;
/**
 * Controlador para actualizar el conductor
 * @param id recibe el Id del conductor,
 * @body  trae los datos a actualizar hasta ahora solo la licencia,
 */
const updateBusDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const licencia = req.body.license;
        const docRef = yield connection_1.db.collection("busDriver").doc(id).get();
        if (!docRef) {
            throw new Error("El conductor no existe");
        }
        yield connection_1.db.collection("busDriver").doc(id).update({ license: licencia });
        res.status(201).json({ menssage: "Licencia actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el conductor", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.updateBusDriver = updateBusDriver;
