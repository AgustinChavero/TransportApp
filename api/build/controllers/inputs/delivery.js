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
exports.deleteDelivery = exports.enableDelivery = exports.updateDelivery = exports.newDelivery = void 0;
const connection_1 = require("../../connection/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendMail_1 = require("../../utils/middelware/sendMail");
/**
 * Controlador para crear distribuidores
 * * @body datos para crear distribuidor tipo DeliveryToRegister
 */
const newDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { payments: {
                cardNumber: "",
                expirationDate: "",
                securityCode: "",
            }, phone: {
                areaCode: "",
                number: "",
                displayPhone: "",
            }, history: [], deleted: false, license: "", status: false, displayName: data.firstName + " " + data.lastName, createdAt: new Date(Date.now()).toISOString(), rating: 0, comments: [{}], vehicle: {
                vehicleId: "",
                patent: "",
            } });
        // Verificar si ya existe un distribuidor con el correo electrónico dado
        const snapshot = yield connection_1.db
            .collection("deliverys")
            .where("email", "==", dataFormated.email)
            .get();
        if (!snapshot.empty) {
            throw new Error("El correo electrónico ya está registrado");
        }
        // Encriptar la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(dataFormated.password, 10);
        dataFormated.password = hashedPassword;
        //crear doocumento de distribuidor
        const docRef = yield connection_1.db.collection("deliverys").add(dataFormated);
        yield (0, sendMail_1.successDeliveryRegister)(dataFormated.email, dataFormated.displayName);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        console.error("Error al crear el distribuidor", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.newDelivery = newDelivery;
/**
 * Controlador para actualizar distribuidores
 * @param req Id tipo string
 * @body datos para actualizar distribuidor tipo DeliveryToUpdate
 */
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // obtener id del distribuidor que se va a actualizar
        const data = req.body; //datos de distribuidor a actualizar
        const updatedAt = new Date(Date.now()).toISOString();
        //verificar si existe el usuario en la base de datos
        const docRef = yield connection_1.db.collection("deliverys").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el distributor");
        }
        // Actualizar el usuario en Firestore
        yield connection_1.db
            .collection("deliverys")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(201).json({ menssage: "Repartidor actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el Repartidor", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.updateDelivery = updateDelivery;
/**
 *Controlador para habilitar un distribuidor
 * @param id del distribuidor
 *
 */
const enableDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //obtener id del distribuidor a eliminar
        const docRef = yield connection_1.db.collection("deliverys").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el distributor");
        }
        // Actualizar el usuario en Firestore
        yield connection_1.db.collection("deliverys").doc(id).update({ deleted: false });
        res.status(201).json({ menssage: "Repartidor habilitado correctamente" });
    }
    catch (error) {
        console.error("Error al habilitar el Repartidor", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.enableDelivery = enableDelivery;
/**
 * Controlador para eliminar un repa por id
 
 * @param id del distribuidor a eliminar
 */
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; //obtener id del distribuidor a eliminar
        const docRef = yield connection_1.db.collection("deliverys").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el distributor");
        }
        // Actualizar el usuario en Firestore
        yield connection_1.db.collection("deliverys").doc(id).update({ deleted: true });
        res.status(201).json({ menssage: "Repartidor eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al borrar el Repartidor", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.deleteDelivery = deleteDelivery;
