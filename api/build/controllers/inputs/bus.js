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
exports.enableBus = exports.deleteBus = exports.updateBus = exports.newBus = void 0;
const connection_1 = require("../../connection/connection");
const newBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false, img: "", history: [] });
        /* const [busDoc] = await Promise.all([
          db.collection("bus_driver").doc(dataFormated.chauffeurId).get(),
        ]);
    
        if (!busDoc.exists) {
          throw new Error("El chofer no existe");
        } */
        const docRef = yield connection_1.db.collection("bus").add(dataFormated);
        /* await db.collection("bus_driver").doc(dataFormated.chauffeurId).update({
          "vehicle.vehicleId": docRef.id,
          "vehicle.patent": data.patent,
        }); */
        res.status(200).json({ message: "Bus creado correctamente", id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear el bus", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.newBus = newBus;
const updateBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const docRef = yield connection_1.db.collection("bus").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El bus no se actualizó");
        }
        yield connection_1.db.collection("bus").doc(id).update(data);
        res.status(200).json({ message: "Bus actualizado correctamente" });
    }
    catch (innerError) {
        console.error("Error al actualizar el bus", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.updateBus = updateBus;
const deleteBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("bus").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El bus no se econtró");
        }
        yield connection_1.db.collection("bus").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Bus deshabilitado correctamente" });
    }
    catch (innerError) {
        console.error("Error al deshabilitar el bus", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.deleteBus = deleteBus;
const enableBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("bus").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El bus no se econtró");
        }
        yield connection_1.db.collection("bus").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Bus habilitado correctamente" });
    }
    catch (innerError) {
        console.error("Error al habilitar el bus", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.enableBus = enableBus;
