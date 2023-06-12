"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../../controllers/outputs/order");
const router = (0, express_1.Router)();
// Ruta para obtener un usuario por su ID
router.get("/", order_1.getOrders);
router.get("/user/:userId", order_1.getOrdersByUserId);
router.get("/:id", order_1.searchOrder);
exports.default = router;
