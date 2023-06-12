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
exports.disableSeatsPassage = exports.updateSeatPassage = exports.updateStatusVehicle = exports.updateStatusDelivery = exports.updateStatusChauffeur = exports.updateAdminStatus = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
/**
 *  Controlador para adminStatus
 * @param changes[], array de estring con los valores a modificar, ["enableBusses", "enableCarPulling", "enableOrders"]
 * puede ser uno o 2 o todos
 */
const updateAdminStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRef = connection_1.db.collection("adminStatus").doc("BECMkRXkiNt1QmsQjjZT");
        const data = yield dataRef.get();
        const changes = req.body.changes;
        const updateData = {};
        changes.forEach((change) => {
            updateData[change] = !data.get(change);
        });
        const docRef = yield connection_1.db
            .collection("adminStatus")
            .doc("BECMkRXkiNt1QmsQjjZT")
            .update(Object.assign({}, updateData));
        const doc = yield connection_1.db.collection("adminStatus").doc("BECMkRXkiNt1QmsQjjZT").get();
        res.status(200).json(doc.data());
    }
    catch (error) {
        try {
            throw (0, http_errors_1.default)(404, error.message);
        }
        catch (innerError) {
            next(innerError);
        }
    }
});
exports.updateAdminStatus = updateAdminStatus;
const updateStatusChauffeur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("chauffeur").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontrón el chofer");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update({ status: true });
        res.status(200).json({ message: "Chofer habilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStatusChauffeur = updateStatusChauffeur;
const updateStatusDelivery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("deliverys").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontrón el repartidor");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update({ status: true });
        res.status(200).json({ message: "Repartidor habilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStatusDelivery = updateStatusDelivery;
const updateStatusVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("vehicle").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontrón el vehiculo");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update({ status: true });
        res.status(200).json({ message: "Vehiculo habilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStatusVehicle = updateStatusVehicle;
const updateSeatPassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const numberSeats = req.body.numberSeat;
        console.log(numberSeats);
        const docRef = yield connection_1.db.collection("passages").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontró el pasaje");
        }
        const passageData = docRef.data();
        const existingSeats = passageData.numberSeat || [];
        const updatedSeats = Array.from(new Set([...existingSeats, ...numberSeats]));
        yield connection_1.db.collection("passages").doc(id).update({
            numberSeat: updatedSeats,
        });
        res.status(200).json({ message: "Pasaje actualizado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateSeatPassage = updateSeatPassage;
const disableSeatsPassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("passages").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontró el pasaje");
        }
        const { numberSeat } = req.body;
        if (!numberSeat) {
            throw (0, http_errors_1.default)(400, "Se requiere el campo numberSeat en el cuerpo de la solicitud");
        }
        console.log(numberSeat);
        const updatedNumberSeat = Array.isArray(numberSeat) ? numberSeat : [numberSeat];
        yield connection_1.db
            .collection("passages")
            .doc(id)
            .update({
            numberSeat: firebase_admin_1.default.firestore.FieldValue.arrayRemove(...updatedNumberSeat),
        });
        res.status(200).json({ message: "Pasaje actualizado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.disableSeatsPassage = disableSeatsPassage;
