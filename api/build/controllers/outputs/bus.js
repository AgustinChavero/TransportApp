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
exports.searchBusByNumber = exports.searchBusByPatent = exports.getBusById = exports.getBus = void 0;
const connection_1 = require("../../connection/connection");
const getBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("bus").where("deleted", "==", false);
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const busSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(busSnapshot.docs.length / pageSize);
        const buses = busSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ buses, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar los buses", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.getBus = getBus;
const getBusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("bus").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Bus no encontrado" });
        }
        else {
            const bus = Object.assign({ id: doc.id }, doc.data());
            res.json(bus);
        }
    }
    catch (error) {
        console.error("Error al obtener el bus", error);
        res.status(500).json({ message: "Error al obtener el Bus" });
    }
});
exports.getBusById = getBusById;
const searchBusByPatent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patent = req.params.patent;
        const doc = yield connection_1.db
            .collection("bus")
            .where("patent", "==", patent)
            .where("deleted", "==", false)
            .get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún bus con la patente ${patent}` });
        }
        const busData = doc.docs[0].data();
        //const { chauffeurId } = busData;
        res.json(Object.assign({}, busData));
    }
    catch (innerError) {
        console.error("Error al encontrar el bus por patente", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchBusByPatent = searchBusByPatent;
const searchBusByNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberBus = req.params.number_bus;
        const doc = yield connection_1.db.collection("bus").where("number_bus", "==", numberBus).get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún bus con el numero ${numberBus}` });
        }
        const busData = doc.docs[0].data();
        //const { chauffeurId } = busData;
        res.json(Object.assign({}, busData));
    }
    catch (innerError) {
        console.error("Error al encontrar el bus por numero", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchBusByNumber = searchBusByNumber;
