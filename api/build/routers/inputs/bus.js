"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bus_1 = require("../../controllers/inputs/bus");
const router = (0, express_1.Router)();
//Ruta para crear bondis
router.post("/", bus_1.newBus);
router.put("/:id", bus_1.updateBus);
router.patch("/:id", bus_1.enableBus);
router.delete("/:id", bus_1.deleteBus);
exports.default = router;
