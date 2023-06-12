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
exports.getInactiveDeliverys = exports.getInactiveChauffeur = exports.getUserRecords = exports.getOperations = exports.getGrossIncome = exports.getProfit = exports.getAdminState = void 0;
const connection_1 = require("../../connection/connection");
const getAdminState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield connection_1.db.collection("adminStatus").doc("BECMkRXkiNt1QmsQjjZT").get();
        if (!doc.exists) {
            throw new Error("No existe el adminState");
        }
        else {
            const adminState = Object.assign({ id: doc.id }, doc.data());
            res.status(200).json(adminState);
        }
    }
    catch (error) {
        console.error("Error al obtener el adminState", error);
        res.status(400).json({ message: "Error al obtener el adminState" });
    }
});
exports.getAdminState = getAdminState;
const getProfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mes = req.query.mes; // Obtener el mes de la query string
        // Obtener datos de las tres colecciones
        const ticketsSnap = yield connection_1.db.collection("tickets").get();
        const ordersSnap = yield connection_1.db.collection("orders").get();
        const travelsSnap = yield connection_1.db.collection("travels").get();
        // Unir los datos de las tres colecciones
        const entradas = [
            ...ticketsSnap.docs.map((doc) => ({
                price: doc.data().price,
                createdAt: doc.data().createdAt,
            })),
            ...ordersSnap.docs.map((doc) => ({
                price: doc.data().price,
                createdAt: doc.data().createdAt,
            })),
            ...travelsSnap.docs.map((doc) => ({
                price: doc.data().price,
                createdAt: doc.data().createdAt,
            })),
        ];
        // Filtrar las entradas por mes
        const entradasDelMes = entradas.filter((entrada) => {
            const fecha = new Date(entrada.createdAt);
            return fecha.getMonth() === parseInt(mes) - 1;
        });
        // Sumar los precios de las entradas del mes
        const gananciasDelMes = entradasDelMes.reduce((total, entrada) => total + entrada.price, 0);
        // Devolver las ganancias en formato JSON
        res.json({ ganancias: gananciasDelMes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error" }); // Devolver un error 500 si ocurre algún problema
    }
});
exports.getProfit = getProfit;
// getGrossIncome recibe un año como query string y retorna los ingresos de cada mes de ese año de tickets, orders y travels
const getGrossIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year;
        const ticketsSnap = yield connection_1.db
            .collection("tickets")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const ticketsRevenuePerMonth = {};
        ticketsSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            ticketsRevenuePerMonth[month] = ticketsRevenuePerMonth[month]
                ? ticketsRevenuePerMonth[month] + doc.data().price
                : doc.data().price;
        });
        const ordersSnap = yield connection_1.db
            .collection("orders")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const ordersRevenuePerMonth = {};
        ordersSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            ordersRevenuePerMonth[month] = ordersRevenuePerMonth[month]
                ? ordersRevenuePerMonth[month] + doc.data().price
                : doc.data().price;
        });
        const travelsSnap = yield connection_1.db
            .collection("travels")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const travelsRevenuePerMonth = {};
        travelsSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            travelsRevenuePerMonth[month] = travelsRevenuePerMonth[month]
                ? travelsRevenuePerMonth[month] + doc.data().price
                : doc.data().price;
        });
        // months van del 0 al 11
        res.status(200).json({ ticketsRevenuePerMonth, ordersRevenuePerMonth, travelsRevenuePerMonth });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.getGrossIncome = getGrossIncome;
const getOperations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year;
        const ticketsSnap = yield connection_1.db
            .collection("tickets")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const ticketsPerMonth = {};
        ticketsSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            ticketsPerMonth[month] = ticketsPerMonth[month] ? ticketsPerMonth[month] + 1 : 1;
        });
        const ordersSnap = yield connection_1.db
            .collection("orders")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const ordersPerMonth = {};
        ordersSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            ordersPerMonth[month] = ordersPerMonth[month] ? ordersPerMonth[month] + 1 : 1;
        });
        const travelsSnap = yield connection_1.db
            .collection("travels")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const travelsPerMonth = {};
        travelsSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            travelsPerMonth[month] = travelsPerMonth[month] ? travelsPerMonth[month] + 1 : 1;
        });
        // months van del 0 al 11
        res.status(200).json({ ticketsPerMonth, ordersPerMonth, travelsPerMonth });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.getOperations = getOperations;
const getUserRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year;
        const usersSnap = yield connection_1.db
            .collection("users")
            .where("createdAt", ">=", year)
            .where("createdAt", "<", year + 1)
            .get();
        const usersRecordsPerMonth = {};
        usersSnap.docs.forEach((doc) => {
            const month = new Date(doc.data().createdAt).getMonth();
            usersRecordsPerMonth[month] = usersRecordsPerMonth[month]
                ? usersRecordsPerMonth[month] + 1
                : 1;
        });
        // months van del 0 al 11
        res.status(200).json({ usersRecordsPerMonth });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error" });
    }
});
exports.getUserRecords = getUserRecords;
const getInactiveChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page = 1, pageSize = 10 } = _a, filters = __rest(_a, ["page", "pageSize"]);
        const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");
        let query = connection_1.db.collection("chauffeur").where("status", "==", false);
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
exports.getInactiveChauffeur = getInactiveChauffeur;
const getInactiveDeliverys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.query, { page = 1, pageSize = 10 } = _b, filters = __rest(_b, ["page", "pageSize"]);
        const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");
        let query = connection_1.db.collection("deliverys").where("status", "==", false);
        validFilters.forEach(([property, value]) => {
            query = query.where(property, "==", value);
        });
        const deliverySnapshot = yield query.get();
        const totalItems = deliverySnapshot.docs.length;
        const totalPages = Math.ceil(totalItems / Number(pageSize));
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const delivery = deliverySnapshot.docs.slice(startIndex, endIndex).map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        res.status(200).json({ delivery, totalPages });
    }
    catch (error) {
        console.error("Error al obtener los distribuidores", error);
        res.status(500).json({ message: "Error al obtener los distribuidores" });
    }
});
exports.getInactiveDeliverys = getInactiveDeliverys;
