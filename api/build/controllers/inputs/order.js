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
exports.orderStateUpdate = exports.updateOrder = exports.newOrder = void 0;
const connection_1 = require("../../connection/connection");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
/**
 * Controlador para crear una orden
 *@body Trae los datos para crear la orden
 */
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const dataFormated = Object.assign(Object.assign({}, orderData), { status: true, order: "pending", createdAt: new Date(Date.now()).toISOString() });
        const [userDoc, distributorDoc, productDoc, localDoc] = yield Promise.all([
            connection_1.db.collection("users").doc(dataFormated.userId).get(),
            connection_1.db.collection("deliverys").doc(dataFormated.deliveryId).get(),
            connection_1.db.collection("products").doc(dataFormated.productId).get(),
            connection_1.db.collection("locals").doc(dataFormated.localId).get(),
        ]);
        if (!userDoc.exists)
            throw Error("El usuario no existe");
        if (!distributorDoc.exists)
            throw Error("El repartidor no existe");
        if (!productDoc.exists)
            throw Error("El producto  no existe");
        if (!localDoc.exists)
            throw Error("El local no existe");
        const distributorData = distributorDoc.data();
        if (!distributorData.status)
            throw Error("El repartidor no esta activo");
        if (distributorData.deleted)
            throw Error("El repartidor ya no existe");
        const productData = productDoc.data();
        if (productData.deleted)
            throw Error("El producto ya no existe");
        const localData = localDoc.data();
        if (localData.deleted)
            throw Error("Esta eliminado");
        if (!localData.status)
            throw Error("El local no esta activo");
        const docRef = yield connection_1.db.collection("orders").add(dataFormated);
        yield Promise.all([
            connection_1.db
                .collection("users")
                .doc(orderData.userId)
                .update({
                "history.orders": firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
            }),
            connection_1.db
                .collection("deliverys")
                .doc(orderData.deliveryId)
                .update({
                "history.orders": firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
            }),
            connection_1.db
                .collection("locals")
                .doc(orderData.localId)
                .update({
                history: firebase_admin_1.default.firestore.FieldValue.arrayUnion(docRef.id),
            }),
        ]);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        console.error("Error al crear la orden", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.newOrder = newOrder;
/**
 * Controlador para actualizar las ordenes
 * @param id recibe el Id de la orden,
 * @body data tarae los datos a actualizar,
 */
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection("orders").doc(id).get();
        if (!docRef) {
            throw new Error("No se encontró la orden");
        }
        // Actualizar el usuario en Firestore
        yield connection_1.db.collection("orders").doc(id).update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(201).json({ menssage: "Orden actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la orden", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.updateOrder = updateOrder;
/**
 * Controllador para actualizar el estado de las ordenes
 * @param id recibe el Id de la orden,
 * @body newStatus manda el nuevo estado de la orden
 * {"newStatus": "process"} {"newStatus": "approved"} {"newStatus": "rejected"}
 */
const orderStateUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.newStatus;
        const doc = yield connection_1.db.collection("orders").doc(orderId).get();
        const data = doc.data();
        if (!data) {
            throw new Error("No se encontró la Orden");
        }
        if (data.order !== "pending" && data.order !== "progress") {
            throw new Error("La orden ya se encuentra finalizada");
        }
        data.order = newStatus;
        yield connection_1.db.collection("orders").doc(orderId).update({ order: data.order });
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ messege: error.message });
    }
});
exports.orderStateUpdate = orderStateUpdate;
