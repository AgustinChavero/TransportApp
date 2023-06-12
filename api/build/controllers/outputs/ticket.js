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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTickets = exports.getTicketById = exports.getTicketByUserId = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
const getTicketByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const [snapshot, passageSnapshots] = yield Promise.all([
            connection_1.db.collection("tickets").where("userId", "==", userId).get(),
            connection_1.db.collection("passages").get(),
        ]);
        if (snapshot.empty) {
            throw (0, http_errors_1.default)(404, "No se encontro el usuarios");
        }
        if (passageSnapshots.empty) {
            throw (0, http_errors_1.default)(404, "No se encontro los pasajes");
        }
        const passageMap = new Map();
        passageSnapshots.forEach((doc) => passageMap.set(doc.id, doc.data()));
        const tickets = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
            const ticketData = doc.data();
            const passageData = passageMap.get(ticketData.passageId);
            return Object.assign(Object.assign({ id: doc.id }, ticketData), { passageInfo: passageData });
        });
        const totalPages = Math.ceil(snapshot.docs.length / pageSize);
        res.status(200).json({ tickets, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.getTicketByUserId = getTicketByUserId;
const getTicketById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const doc = yield connection_1.db.collection("tickets").doc(id).get();
        if (!doc.exists) {
            throw (0, http_errors_1.default)(404, "El ticket no existe");
        }
        const ticket = Object.assign({ id: doc.id }, doc.data());
        res.status(200).json(ticket);
    }
    catch (error) {
        next(error);
    }
});
exports.getTicketById = getTicketById;
const getAllTickets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProperties = Object.keys(req.query);
        let query = connection_1.db.collection("tickets");
        allProperties.forEach((property) => {
            if (property === "page" || property === "pageSize") {
                return;
            }
            query = query.where(property, "==", req.query[property]);
        });
        const ticketsSnapshot = yield query.get();
        if (ticketsSnapshot.empty) {
            throw (0, http_errors_1.default)(404, "No se encontraron tickets");
        }
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalPages = Math.ceil(ticketsSnapshot.size / pageSize);
        const ticketData = ticketsSnapshot.docs
            .slice(startIndex, endIndex)
            .map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(201).json({ tickets: ticketData, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTickets = getAllTickets;
