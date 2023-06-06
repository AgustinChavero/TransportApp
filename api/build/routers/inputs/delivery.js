"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delivery_1 = require("../../controllers/inputs/delivery");
const router = (0, express_1.Router)();
//Ruta creancion distribuidor
router.post("/", delivery_1.newDelivery);
//Ruta actualizar distribuidor
router.put("/:id", delivery_1.updateDelivery);
//Ruta habilitar distribuidor
router.patch("/enable/:id", delivery_1.deleteDelivery);
//Ruta eliminar distribuido
router.delete("/delete/:id", delivery_1.deleteDelivery);
exports.default = router;
