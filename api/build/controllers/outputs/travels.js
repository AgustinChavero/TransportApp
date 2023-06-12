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
exports.travelByChauffeur = exports.getAllTravel = exports.travelByUser = exports.searchTravel = void 0;
const connection_1 = require("../../connection/connection");
const searchTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("travels").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Viaje no encontrado" });
        }
        else {
            const usuario = Object.assign({ id: doc.id }, doc.data());
            res.json(usuario);
        }
    }
    catch (error) {
        console.error("Error al obtener el viaje", error);
        res.status(500).json({ message: "Error al obtener el viaje" });
    }
});
exports.searchTravel = searchTravel;
const travelByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // obtiene el ID del usuario desde la solicitud
        // Realiza la consulta a la base de datos
        const snapshot = yield connection_1.db.collection("travels").where("userId", "==", userId).get();
        // Crea un array con todos los viajes encontrados
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(snapshot.docs.length / pageSize);
        const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        // Envía la respuesta al cliente
        res.status(200).json({ travels, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los viajes del usuario");
    }
});
exports.travelByUser = travelByUser;
const getAllTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield connection_1.db.collection("travels").get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(snapshot.docs.length / pageSize);
        // Crea un array con todos los viajes encontrados
        const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        // Envía la respuesta al cliente
        res.status(200).json({ travels, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los viajes del chofer");
    }
});
exports.getAllTravel = getAllTravel;
const travelByChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chauffeurId = req.params.chauffeurId; // obtiene el ID del chofer desde la solicitud
        // Realiza la consulta a la base de datos
        const snapshot = yield connection_1.db.collection("travels").where("chauffeurId", "==", chauffeurId).get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(snapshot.docs.length / pageSize);
        // Crea un array con todos los viajes encontrados
        const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        // Envía la respuesta al cliente
        res.status(200).json({ travels, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los viajes del chofer");
    }
});
exports.travelByChauffeur = travelByChauffeur;
