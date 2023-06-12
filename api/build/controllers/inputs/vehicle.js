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
exports.deleteVehicle = exports.enableVehicle = exports.updateVehicle = exports.newVehicleByDelivery = exports.newVehicleByChauffeur = void 0;
const connection_1 = require("../../connection/connection");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const newVehicleByChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false, status: false, createdAt: new Date(Date.now()).toISOString() });
        const [chauffeurDoc, ownerDoc] = yield Promise.all([
            connection_1.db.collection("chauffeur").doc(dataFormated.chauffeurId).get(),
            connection_1.db.collection("owner").doc(dataFormated.ownerId).get(),
        ]);
        if (!chauffeurDoc.exists) {
            throw new Error("El chofer no existe");
        }
        if (!ownerDoc.exists) {
            throw new Error("El dueño no existe");
        }
        const docRef = yield connection_1.db.collection("vehicle").add(dataFormated);
        yield connection_1.db.collection("chauffeur").doc(dataFormated.chauffeurId).update({
            "vehicle.vehicleId": docRef.id,
            "vehicle.patent": data.patent,
        });
        yield connection_1.db
            .collection("owner")
            .doc(dataFormated.ownerId)
            .update({
            vehiclesId: firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
        });
        res.status(200).json({ message: "Vehículo creado correctamente", id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear el vehículo", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.newVehicleByChauffeur = newVehicleByChauffeur;
const newVehicleByDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false, status: false, createdAt: new Date(Date.now()).toISOString() });
        const [dealerDoc, ownerDoc] = yield Promise.all([
            connection_1.db.collection("deliverys").doc(dataFormated.deliveryId).get(),
            connection_1.db.collection("owner").doc(dataFormated.ownerId).get(),
        ]);
        if (!dealerDoc.exists) {
            throw new Error("El repartidor no existe");
        }
        if (!ownerDoc.exists) {
            throw new Error("El dueño no existe");
        }
        const docRef = yield connection_1.db.collection("vehicle").add(dataFormated);
        yield connection_1.db.collection("deliverys").doc(dataFormated.deliveryId).update({
            "vehicle.vehicleId": docRef.id,
            "vehicle.patent": data.patent,
        });
        yield connection_1.db
            .collection("owner")
            .doc(dataFormated.ownerId)
            .update({
            vehiclesId: firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
        });
        res.status(200).json({ message: "Vehículo creado correctamente", id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear el vehículo", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.newVehicleByDelivery = newVehicleByDelivery;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection("vehicle").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El vehículo no se actualizo");
        }
        yield connection_1.db
            .collection("vehicle")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Vehículo actualizado correctamente" });
    }
    catch (innerError) {
        console.error("Error al actualizar el vehículo", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.updateVehicle = updateVehicle;
const enableVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("vehicle").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El vehículo no se econtró");
        }
        yield connection_1.db.collection("vehicle").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Vehículo habilitado correctamente" });
    }
    catch (innerError) {
        console.error("Error al habilitar el vehículo", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.enableVehicle = enableVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const docRef = yield connection_1.db.collection("vehicle").doc(id).get();
        if (!docRef.exists) {
            throw new Error("El vehículo no se eliminó");
        }
        yield connection_1.db.collection("vehicle").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Vehículo eliminado correctamente" });
    }
    catch (innerError) {
        console.error("Error al eliminar el vehículo", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.deleteVehicle = deleteVehicle;
