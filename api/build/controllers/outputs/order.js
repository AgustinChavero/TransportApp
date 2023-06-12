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
exports.getOrdersByUserId = exports.getOrders = exports.searchOrder = void 0;
const connection_1 = require("../../connection/connection");
/**
 * Controlador para buscar una orden por id
 */
const searchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("orders").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Orden no encontrado" });
        }
        else {
            const orden = doc.data();
            res.status(201).json(orden);
        }
    }
    catch (error) {
        console.error("Error al obtener la orden", error);
        res.status(500).json({ message: "Error al obtener la orden" });
    }
});
exports.searchOrder = searchOrder;
/**
 * controlador para buscar todas las ordenes
 */
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("orders");
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const ordersSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(ordersSnapshot.size / pageSize);
        const ordersData = ordersSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(201).json({ orders: ordersData, totalPages });
    }
    catch (error) {
        console.error("Error al obtener las ordenes", error);
        res.status(500).json({ message: "Error al obtener las ordenes" });
    }
});
exports.getOrders = getOrders;
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("orders");
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        // Se agrega una cláusula adicional para filtrar por el userId
        query = query.where("userId", "==", req.params.userId);
        const ordersSnapshot = yield query.get();
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(ordersSnapshot.size / pageSize);
        const ordersData = ordersSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(201).json({ orders: ordersData, totalPages });
    }
    catch (error) {
        console.error("Error al obtener las ordenes", error);
        res.status(500).json({ message: "Error al obtener las ordenes" });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
