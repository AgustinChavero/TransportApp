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
exports.getBusDriver = exports.searhBusDriver = void 0;
const connection_1 = require("../../connection/connection");
/**
 * Controlador para buscar un conductor por id
 * @param id  id del conductor
 */
const searhBusDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("busDriver").doc(id).get();
        if (!doc.exists) {
            res.status(404).send({ message: "Conductor no encontrado" });
        }
        else {
            const conductor = Object.assign({ id: doc.id }, doc.data());
            res.json(conductor);
        }
    }
    catch (error) {
        console.error("Error al obtener conductor", error);
        res.status(500).json({ message: "Error al obtener el conductor" });
    }
});
exports.searhBusDriver = searhBusDriver;
/**
 * controlador para buscar todos los conductores
 */
const getBusDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("busDriver");
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const busDriversSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 6;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(busDriversSnapshot.size / pageSize);
        const busDriversData = busDriversSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(201).json({ busDrivers: busDriversData, totalPages });
    }
    catch (error) {
        console.error("Error al obtener los conductores", error);
        res.status(500).json({ message: "Error al obtener los conductores" });
    }
});
exports.getBusDriver = getBusDriver;
