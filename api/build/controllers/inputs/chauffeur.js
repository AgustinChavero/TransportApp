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
exports.deleteChauffeur = exports.enableChauffeur = exports.updateChauffeur = exports.newChauffeur = void 0;
const connection_1 = require("../../connection/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const newChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false, ownerState: false, vehicle: {
                vehicleId: "",
                patent: "",
            }, payments: {
                cardNumber: "",
                expirationDate: "",
                securityCode: "",
            }, phone: {
                areaCode: "",
                number: "",
                displayPhone: "",
            }, img: "", history: [], createdAt: new Date(Date.now()).toISOString(), displayName: data.firstName + " " + data.lastName, status: false, rating: 0, comments: [{}] });
        const snapshot = yield connection_1.db
            .collection("chauffeur")
            .where("email", "==", dataFormated.email)
            .get();
        if (!snapshot.empty) {
            throw new Error("El correo electrónico ya está registrado");
        }
        const hashedPassword = yield bcrypt_1.default.hash(dataFormated.password, 10);
        dataFormated.password = hashedPassword;
        const docRef = yield connection_1.db.collection("chauffeur").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        try {
            throw new Error(error.message);
        }
        catch (innerError) {
            console.error("Error al crear el chofer", innerError);
            res.status(400).json({ message: innerError.message });
        }
    }
});
exports.newChauffeur = newChauffeur;
const updateChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection("chauffeur").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el chofer");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Chofer actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el usuario", error);
        res.status(400).json({ message: error.message });
    }
});
exports.updateChauffeur = updateChauffeur;
const enableChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("chauffeur").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontrón el chofer");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Chofer habilitado correctamente" });
    }
    catch (error) {
        console.error("Error al habilitar el chofer", error);
        res.status(400).json({ message: error.message });
    }
});
exports.enableChauffeur = enableChauffeur;
const deleteChauffeur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("chauffeur").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontrón el chofer");
        }
        yield connection_1.db.collection("chauffeur").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Chofer eliminado correctamente" });
    }
    catch (innerError) {
        console.error("Error al eliminar el chofer", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.deleteChauffeur = deleteChauffeur;
