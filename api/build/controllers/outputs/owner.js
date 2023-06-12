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
exports.searchOwner = exports.searchAllOwners = void 0;
const connection_1 = require("../../connection/connection");
const searchAllOwners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("owner").where("deleted", "==", false);
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const ownerSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(ownerSnapshot.docs.length / pageSize);
        const owners = ownerSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ owners, totalPages });
    }
    catch (innerError) {
        console.error("Error al encontrar propietarios", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchAllOwners = searchAllOwners;
const searchOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("owner").doc(id).get();
        if (!doc.exists) {
            throw new Error("Propietario no encontrado");
        }
        else {
            const ownerData = Object.assign({ id: doc.id }, doc.data());
            res.json(ownerData);
        }
    }
    catch (innerError) {
        console.error("Error al encontrar el propietario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchOwner = searchOwner;
