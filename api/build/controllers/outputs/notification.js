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
exports.searchNotifications = void 0;
const connection_1 = require("../../connection/connection");
const searchNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const notifications = yield connection_1.db.collection("notifications").where("userId", "==", id).get();
        if (notifications.empty) {
            res.status(404).json({ message: "No hay notificaciones" });
            return;
        }
        const result = notifications.docs.map((doc) => doc.data());
        res.status(200).json({ notifications: result });
    }
    catch (innerError) {
        console.error("Error al buscar las notificaciones", innerError);
        res.status(400).json({ message: innerError.message });
    }
});
exports.searchNotifications = searchNotifications;
