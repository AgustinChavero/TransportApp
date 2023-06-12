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
exports.getProductId = exports.getAllProductsByStore = exports.getAllProductsByType = exports.getAllProducts = void 0;
const connection_1 = require("../../connection/connection");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        let productRef = connection_1.db.collection("products");
        if (Object.keys(req.query).length > 2) {
            const filters = Object.keys(req.query).filter(key => key !== 'page' && key !== 'pageSize');
            filters.forEach(key => {
                productRef = productRef.where(key, '==', req.query[key]);
            });
        }
        //agregar  varioble para saber si un producto esta en disponible o listo para agregarse un boolenano
        const totalProductSnapshot = yield productRef.get();
        const totalFilteredProducts = totalProductSnapshot.size;
        const totalPages = Math.ceil(totalFilteredProducts / pageSize);
        const productsSnapshot = yield productRef.limit(endIndex).get();
        const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json({ products: productsData, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('Error al obtener los productos');
    }
});
exports.getAllProducts = getAllProducts;
const getAllProductsByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productType = req.params.productType;
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const productRef = connection_1.db.collection('products').where('type', '==', productType);
        const totalProductSnapshot = yield productRef.get();
        const totalFilteredProducts = totalProductSnapshot.size;
        const totalPages = Math.ceil(totalFilteredProducts / pageSize);
        const productsSnapshot = yield productRef.limit(endIndex).get();
        const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json({ products: productsData, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('Error al obtener los productos por tipo');
    }
});
exports.getAllProductsByType = getAllProductsByType;
const getAllProductsByStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = req.params.store;
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const productRef = connection_1.db.collection('products').where('localId', '==', store);
        const totalProductSnapshot = yield productRef.get();
        const totalFilteredProducts = totalProductSnapshot.size;
        const totalPages = Math.ceil(totalFilteredProducts / pageSize);
        const productsSnapshot = yield productRef.limit(endIndex).get();
        const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json({ products: productsData, totalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('Error al obtener los productos por tipo');
    }
});
exports.getAllProductsByStore = getAllProductsByStore;
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doc = yield connection_1.db.collection("products").doc(id).get();
        if (!doc.exists) {
            res.status(404).json({ message: "Producto no encontrado" });
        }
        else {
            const product = Object.assign({ id: doc.id }, doc.data());
            res.status(200).json(product);
        }
    }
    catch (error) {
        console.error("Error al obtener el producto", error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
});
exports.getProductId = getProductId;
