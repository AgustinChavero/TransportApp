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
exports.cancelTravel = exports.updateTravel = exports.newTravel = void 0;
const connection_1 = require("../../connection/connection");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const newTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { status: true, travel: "pending", createdAt: new Date(Date.now()).toISOString() });
        const [userDoc, chauffeurDoc] = yield Promise.all([
            connection_1.db.collection("users").doc(dataFormated.userId).get(),
            connection_1.db.collection("chauffeur").doc(dataFormated.chauffeurId).get(),
        ]);
        if (!userDoc.exists)
            res.status(404).json({ message: "El usuario no existe" });
        if (!chauffeurDoc.exists)
            res.status(404).json({ message: "El chofer no existe" });
        const chauffeurData = chauffeurDoc.data();
        if (!chauffeurData.status)
            res.status(400).json({ message: "El chofer esta inactivo" });
        if (chauffeurData.deleted)
            res.status(400).json({ message: "El chofer esta eliminado" });
        const docRef = yield connection_1.db.collection("travels").add(dataFormated);
        yield connection_1.db.collection("users").doc(dataFormated.userId).update({
            "history.travels": firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
        });
        yield connection_1.db.collection("chauffeur").doc(dataFormated.chauffeurId).update({
            "history.travels": firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
        });
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        console.error("Error al crear el viaje", error);
        res.status(500).json({ message: error.message });
    }
});
exports.newTravel = newTravel;
const updateTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAt = new Date(Date.now()).toISOString();
        const id = req.params.id;
        const travelsCollection = connection_1.db.collection("travels");
        const docRef = yield travelsCollection.doc(id).get();
        const currentStatus = docRef.get("travel");
        const newStatus = currentStatus === "pending" ? "progress" : currentStatus === "progress" ? "finished" : (() => { throw new Error("El estado actual del viaje no es válido"); })();
        yield travelsCollection.doc(id).update({ travel: newStatus, updatedAt: updatedAt });
        res.status(200).json({ message: "Viaje actualizado correctamente", newStatus });
    }
    catch (error) {
        const message = `Error al actualizar el viaje: ${error.message}`;
        console.error(message);
        res.status(400).json({ message });
    }
});
exports.updateTravel = updateTravel;
const cancelTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAt = new Date(Date.now()).toISOString();
        const id = req.params.id;
        const travelsCollection = connection_1.db.collection("travels");
        const docRef = yield travelsCollection.doc(id).get();
        const currentStatus = docRef.get("travel");
        if (currentStatus !== "pending") {
            throw new Error("El viaje no se puede cancelar porque no está en estado pendiente");
        }
        yield travelsCollection.doc(id).update({ travel: "rejected", updatedAt: updatedAt });
        res.status(200).json({ message: "Viaje cancelado correctamente" });
    }
    catch (error) {
        const message = `Error al cancelar el viaje: ${error.message}`;
        console.error(message);
        res.status(400).json({ message });
    }
});
exports.cancelTravel = cancelTravel;
