"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busDriver_1 = require("../../controllers/inputs/busDriver");
const router = (0, express_1.Router)();
//Ruta creacion de
router.post("/", busDriver_1.newBusDriver);
//Ruta actualizar busDriver
router.put("/:id", busDriver_1.updateBusDriver);
exports.default = router;
