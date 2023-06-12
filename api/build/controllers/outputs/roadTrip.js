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
exports.searhBusDriver = exports.getRoadTrip = void 0;
const connection_1 = require("../../connection/connection");
/**
 * controlador para buscar todos las rutas con opciones de filtrado por query
 * * @query page: numero de pagina
 * @query pageSize: numero de rutas por pagina
 * @query origin: origen del ruta
 * @query destination: destino del ruta
 *  @query stops: array de paradas
 */
const getRoadTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("roadTrip");
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const roadTripSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 6;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(roadTripSnapshot.size / pageSize);
        const roadTripData = roadTripSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(201).json({ roadTrip: roadTripData, totalPages });
    }
    catch (error) {
        console.error("Error al obtener las rutas", error);
        res.status(500).json({ message: "Error al obtener las rutas" });
    }
});
exports.getRoadTrip = getRoadTrip;
/**
 * Controlador para buscar una ruta por id
 * @param id  id del ruta
 */
const searhBusDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("roadTrip").doc(id).get();
        if (!doc.exists) {
            res.status(404).send({ message: "Ruta no encontrada" });
        }
        else {
            const conductor = Object.assign({ id: doc.id }, doc.data());
            res.json(conductor);
        }
        res.status(201).json();
    }
    catch (error) {
        console.error("Error al obtener la ruta", error);
        res.status(500).json({ message: "Error al obtener la ruta" });
    }
});
exports.searhBusDriver = searhBusDriver;
