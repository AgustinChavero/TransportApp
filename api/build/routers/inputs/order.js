"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../../controllers/inputs/order");
const router = (0, express_1.Router)();
//Ruta creancion Orden
router.post("/", order_1.newOrder);
//Ruta actualizar Orden
router.put("/:id", order_1.updateOrder);
//Ruta de actualizar estado de Orden
router.put("/orderStateUpdate/:id", order_1.orderStateUpdate);
exports.default = router;
