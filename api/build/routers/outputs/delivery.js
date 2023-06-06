"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delivery_1 = require("../../controllers/outputs/delivery");
const router = (0, express_1.Router)();
// Ruta para obtener un usuario por su ID
router.get("/:id", delivery_1.searchDelivery);
router.get("/", delivery_1.getDelivery);
exports.default = router;
