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
exports.roadTripUpdate = exports.newRoadTrip = void 0;
const connection_1 = require("../../connection/connection");
/**
 * Controlador para crear la ruta
 * * @body datos para crear la ruta
 */
const newRoadTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false });
        const docRef = yield connection_1.db.collection("roadTrip").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear la ruta", innerError);
        res.status(500).send("Error al crear una nueva ruta");
    }
});
exports.newRoadTrip = newRoadTrip;
/**
 * Controlador para actualizar la ruta
 * @param id recibe el Id de la ruta,
 * @body  trae los datos a actualizar
 */
const roadTripUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const docRef = yield connection_1.db.collection("roadTrip").doc(id).get();
        if (!docRef) {
            throw new Error("La ruta no existe");
        }
        yield connection_1.db.collection("roadTrip").doc(id).update({ data });
        res.status(201).json({ menssage: "Ruta actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la ruta", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.roadTripUpdate = roadTripUpdate;
