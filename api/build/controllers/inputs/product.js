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
exports.deletedProduct = exports.enableProduct = exports.updateProduct = exports.newProduct = void 0;
const connection_1 = require("../../connection/connection");
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { deleted: false, createdAt: new Date(Date.now()).toISOString() });
        const [localDoc] = yield Promise.all([
            connection_1.db.collection("locals").doc(dataFormated.localId).get(),
        ]);
        if (!localDoc.exists) {
            throw new Error("El local no existe");
        }
        const docRef = yield connection_1.db.collection("products").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un nuevo producto');
    }
});
exports.newProduct = newProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedProductData = req.body;
        const updatedAt = new Date(Date.now()).toISOString();
        const docRef = yield connection_1.db.collection('products').doc(id).get();
        if (!docRef) {
            throw new Error("No se encontró el producto");
        }
        yield connection_1.db.collection('products').doc(id).update(Object.assign(Object.assign({}, updatedProductData), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Producto actualizado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
});
exports.updateProduct = updateProduct;
const enableProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("product").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el producto");
        }
        yield connection_1.db.collection("product").doc(id).update({ deleted: false });
        res.status(201).json({ menssage: "Producto habilitado correctamente" });
    }
    catch (error) {
        console.error("Error al habilitar el Producto", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.enableProduct = enableProduct;
const deletedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("product").doc(id).get();
        if (!docRef.exists) {
            throw new Error("No se encontró el producto");
        }
        yield connection_1.db.collection("product").doc(id).update({ deleted: true });
        res.status(201).json({ menssage: "Producto eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al borrar el Producto", error);
        res.status(400).json({ messege: error.message });
    }
});
exports.deletedProduct = deletedProduct;
