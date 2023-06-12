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
exports.searchVehicleByYear = exports.searchVehicleByBrand = exports.searchVehicleByOwner = exports.searchVehicleByChauffeur = exports.searchVehicleByPatent = exports.getVehicleById = exports.getVehicles = void 0;
const connection_1 = require("../../connection/connection");
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("vehicle").where("deleted", "==", false);
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const vehicleSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);
        const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ vehicles, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar los vehículos", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.getVehicles = getVehicles;
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("vehicle").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Vehículo no encontrado" });
        }
        else {
            const vehicle = Object.assign({ id: doc.id }, doc.data());
            res.status(200).json(vehicle);
        }
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por id", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.getVehicleById = getVehicleById;
const searchVehicleByPatent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patent = req.params.patent;
        const doc = yield connection_1.db
            .collection("vehicle")
            .where("patent", "==", patent)
            .where("deleted", "==", false)
            .get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún vehículo con la patente ${patent}` });
        }
        const vehicleData = doc.docs[0].data();
        const { ownerId, chauffeurId } = vehicleData;
        res.json(Object.assign(Object.assign({}, vehicleData), { ownerId, chauffeurId }));
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por patente", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchVehicleByPatent = searchVehicleByPatent;
const searchVehicleByChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chauffeur = req.params.chauffeurId;
        const doc = yield connection_1.db
            .collection("vehicle")
            .where("chauffeurId", "==", chauffeur)
            .where("deleted", "==", false)
            .get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró vehículo asignados a ${chauffeur}` });
        }
        const vehicleData = doc.docs[0].data();
        const { ownerId, chauffeurId } = vehicleData;
        res.json(Object.assign(Object.assign({}, vehicleData), { ownerId, chauffeurId }));
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por chofer", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchVehicleByChauffeur = searchVehicleByChauffeur;
const searchVehicleByOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.params.ownerId;
        const vehicleSnapshot = yield connection_1.db.collection("vehicle").where("ownerId", "==", ownerId).get();
        if (vehicleSnapshot.empty) {
            res
                .status(404)
                .json({ message: `No se encontró ningún vehículo en propiedad de ${ownerId}` });
        }
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);
        const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ vehicles, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por propietario", innerError);
        res.status(400).json;
    }
});
exports.searchVehicleByOwner = searchVehicleByOwner;
const searchVehicleByBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = req.params.brand;
        const vehicleRef = connection_1.db.collection("vehicle");
        const vehicleSnapshot = yield vehicleRef
            .where("brand", "==", brand)
            .where("deleted", "==", false)
            .get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);
        const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ vehicles, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por marca", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchVehicleByBrand = searchVehicleByBrand;
const searchVehicleByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.params.year;
        const vehicleRef = connection_1.db.collection("vehicle");
        const vehicleSnapshot = yield vehicleRef
            .where("year", "==", year)
            .where("deleted", "==", false)
            .get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);
        const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ vehicles, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar el vehículo por año", innerError);
        res.status(400).json;
    }
});
exports.searchVehicleByYear = searchVehicleByYear;
