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
exports.newNotification = void 0;
const connection_1 = require("../../connection/connection");
const newNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { createdAt: new Date(Date.now()).toISOString() });
        const docRef = yield connection_1.db.collection("notifications").add(dataFormated);
        res.status(201).json({ id: docRef.id });
    }
    catch (innerError) {
        console.error("Error al crear el usuario", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.newNotification = newNotification;
