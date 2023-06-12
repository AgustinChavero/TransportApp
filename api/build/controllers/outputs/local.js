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
exports.getLocalByProduct = exports.getLocals = exports.searchLocal = void 0;
const connection_1 = require("../../connection/connection");
const searchLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("locals").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Local no encontrado" });
        }
        else {
            const local = doc.data();
            res.json(local);
        }
    }
    catch (error) {
        console.error("Error al obtener el local", error);
        res.status(500).json({ message: "Error al obtener el local" });
    }
});
exports.searchLocal = searchLocal;
const getLocals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("locals").where("deleted", "==", false);
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const localsSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(localsSnapshot.docs.length / pageSize);
        const localsData = localsSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ locals: localsData, totalPages });
    }
    catch (error) {
        console.error("Error al obtener los locales", error);
        res.status(500).json({ message: "Error al obtener los locales" });
    }
});
exports.getLocals = getLocals;
const getLocalByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productDoc = yield connection_1.db.collection("products").doc(id).get();
        if (!productDoc.exists) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        else {
            const product = productDoc.data();
            const localDoc = yield connection_1.db.collection("locals").doc(product.localId[0]).get();
            if (!localDoc.exists) {
                res.status(404).json({ message: "Local no encontrado" });
            }
            else {
                const local = localDoc.data();
                res.json(local);
            }
        }
    }
    catch (error) {
        console.error("Error al obtener el local", error);
        res.status(500).json({ message: "Error al obtener el local" });
    }
});
exports.getLocalByProduct = getLocalByProduct;
