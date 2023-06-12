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
exports.getDelivery = exports.searchDelivery = void 0;
const connection_1 = require("../../connection/connection");
/**
 * Controlador para buscar un distribuidor por id
 */
const searchDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("deliverys").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Distribuidor no encontrado" });
        }
        else {
            const distribuidor = doc.data();
            res.status(201).json(distribuidor);
        }
    }
    catch (error) {
        console.error("Error al obtener el distribuidor", error);
        res.status(500).json({ message: "Error al obtener el distribuidor" });
    }
});
exports.searchDelivery = searchDelivery;
/**
 * Controlador para obtener todos los distribuidores
 * con paginado
 */
const getDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page = 1, pageSize = 10 } = _a, filters = __rest(_a, ["page", "pageSize"]);
        const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");
        let query = connection_1.db.collection("deliverys");
        validFilters.forEach(([property, value]) => {
            query = query.where(property, "==", value);
        });
        const distributorSnapshot = yield query.get();
        const totalItems = distributorSnapshot.docs.length;
        const totalPages = Math.ceil(totalItems / Number(pageSize));
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const deliverys = distributorSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ deliverys, totalPages, totalItems });
    }
    catch (error) {
        console.error("Error al obtener los distribuidores", error);
        res.status(500).json({ message: "Error al obtener los distribuidores" });
    }
});
exports.getDelivery = getDelivery;
