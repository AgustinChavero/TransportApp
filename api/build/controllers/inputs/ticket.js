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
exports.cancelTicket = exports.acceptTicket = exports.newTicket = void 0;
const connection_1 = require("../../connection/connection");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const http_errors_1 = __importDefault(require("http-errors"));
const newTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const [userDoc, passageDoc] = yield Promise.all([
            connection_1.db.collection("users").doc(data.userId).get(),
            connection_1.db.collection("passages").doc(data.passageId).get(),
        ]);
        if (!userDoc.exists) {
            throw (0, http_errors_1.default)(404, "El usuario no existe");
        }
        if (!passageDoc.exists) {
            throw (0, http_errors_1.default)(404, "El pasaje no existe");
        }
        const passageData = passageDoc.data();
        const ticketPrice = passageData.price;
        const currentStock = passageData.stock;
        if (currentStock < data.quantity) {
            throw (0, http_errors_1.default)(404, "No hay suficiente stock disponible");
        }
        const dataFormatted = Object.assign(Object.assign({}, data), { reviewSent: false, status: "pending", createdAt: new Date().toISOString(), updatedAt: "", price: ticketPrice });
        const docRef = yield connection_1.db.collection("tickets").add(dataFormatted);
        const updatedStock = currentStock - data.quantity;
        const description = data.passengersData.description;
        const seatRegex = /asiento (\d+)/g;
        const numberSeat = [];
        let match;
        while ((match = seatRegex.exec(description)) !== null) {
            numberSeat.push(match[1]);
        }
        const areSeatsValid = numberSeat.every((seat) => passageData.numberSeat.includes(seat));
        if (!areSeatsValid) {
            throw (0, http_errors_1.default)(400, "Algunos asientos seleccionados no son válidos");
        }
        const selectedSeats = numberSeat;
        const updatedNumberSeat = passageData.numberSeat.filter((seat) => !selectedSeats.includes(seat));
        yield Promise.all([
            connection_1.db
                .collection("users")
                .doc(data.userId)
                .update({
                "history.tickets": firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
            }),
            connection_1.db.collection("passages").doc(data.passageId).update({
                stock: updatedStock,
                numberSeat: updatedNumberSeat,
            }),
        ]);
        const userData = userDoc.data();
        //comentamos el mail porq tira errores del token
        //await successTicket(userData.email, userData.name);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newTicket = newTicket;
const acceptTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedAt = new Date().toISOString();
        const ticketRef = connection_1.db.collection("tickets").doc(id);
        const ticketDoc = yield ticketRef.get();
        if (!ticketDoc.exists) {
            throw (0, http_errors_1.default)(404, "El ticket no existe");
        }
        yield ticketRef.update({ status: "acepted", updatedAt });
        res.status(201).json({ message: "Ticket actualizado" });
    }
    catch (error) {
        next(error);
    }
});
exports.acceptTicket = acceptTicket;
const cancelTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedAt = new Date().toISOString();
        const ticketDoc = yield connection_1.db.collection("tickets").doc(id).get();
        if (!ticketDoc.exists) {
            throw (0, http_errors_1.default)(404, "El ticket no existe");
        }
        yield connection_1.db.collection("tickets").doc(id).update({
            status: "canceled",
            updatedAt,
        });
        res.status(201).json({ message: "Ticket cancelado" });
    }
    catch (error) {
        next(error);
    }
});
exports.cancelTicket = cancelTicket;
