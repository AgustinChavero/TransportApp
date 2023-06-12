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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchChauffeurCc = exports.searchChauffeurCe = exports.searchChauffeurName = exports.searchChauffeurByPatent = exports.allChauffeur = exports.searchChauffeur = void 0;
const connection_1 = require("../../connection/connection");
const searchChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("chauffeur").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Chofer no encontrado" });
        }
        else {
            const chauffeur = doc.data();
            res.json(chauffeur);
        }
    }
    catch (error) {
        console.error("Error al obtener el chofer", error);
        res.status(500).json({ message: "Error al obtener el chofer" });
    }
});
exports.searchChauffeur = searchChauffeur;
const allChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page = 1, pageSize = 10 } = _a, filters = __rest(_a, ["page", "pageSize"]);
        const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");
        let query = connection_1.db.collection("chauffeur").where("deleted", "==", false);
        validFilters.forEach(([property, value]) => {
            query = query.where(property, "==", value);
        });
        const chauffeurSnapshot = yield query.get();
        const totalItems = chauffeurSnapshot.docs.length;
        const totalPages = Math.ceil(totalItems / Number(pageSize));
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const chauffeur = chauffeurSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ chauffeur, totalPages });
    }
    catch (error) {
        console.error("Error al obtener los distribuidores", error);
        res.status(500).json({ message: "Error al obtener los distribuidores" });
    }
});
exports.allChauffeur = allChauffeur;
const searchChauffeurByPatent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patent = req.params.patent;
        const doc = yield connection_1.db.collection("chauffeur").where("vehicle.patent", "==", patent).get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún chofer con la patente ${patent}` });
        }
        const chauffeurData = doc.docs[0].data();
        res.json(chauffeurData);
    }
    catch (error) {
        console.error("Error al obtener el chofer", error);
        res.status(500).json({ message: "Error al obtener el chofer" });
    }
});
exports.searchChauffeurByPatent = searchChauffeurByPatent;
const searchChauffeurName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const doc = yield connection_1.db.collection("chauffeur").where("displayname", "==", name).get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún chofer con el nombre ${name}` });
        }
        const chauffeurData = doc.docs[0].data();
        res.json(chauffeurData);
    }
    catch (error) {
        console.error("Error al obtener el chofer", error);
        res.status(500).json({ message: "Error al obtener el chofer" });
    }
});
exports.searchChauffeurName = searchChauffeurName;
const searchChauffeurCe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ce = req.params.ce;
        const doc = yield connection_1.db.collection("chauffeur").where("ce", "==", ce).get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún chofer con esat cedula de extranjero ${ce}` });
        }
        const chauffeurData = doc.docs[0].data();
        res.json(chauffeurData);
    }
    catch (error) {
        console.error("Error al obtener el chofer", error);
        res.status(500).json({ message: "Error al obtener el chofer" });
    }
});
exports.searchChauffeurCe = searchChauffeurCe;
const searchChauffeurCc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cc = req.params.cc;
        const doc = yield connection_1.db.collection("chauffeur").where("cc", "==", cc).get();
        if (doc.empty) {
            res.status(404).json({ message: `No se encontró ningún chofer con el documento de identidad ${cc}` });
        }
        const chauffeurData = doc.docs[0].data();
        res.json(chauffeurData);
    }
    catch (error) {
        console.error("Error al obtener el chofer", error);
        res.status(500).json({ message: "Error al obtener el chofer" });
    }
});
exports.searchChauffeurCc = searchChauffeurCc;
