"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bus_1 = require("../../controllers/outputs/bus");
const router = (0, express_1.Router)();
//Rutas para obtener bondis
router.get("/", bus_1.getBus);
router.get("/:id", bus_1.getBusById);
router.get("/patent/:patent", bus_1.searchBusByPatent);
router.get("/number_bus/:number_bus", bus_1.searchBusByNumber);
exports.default = router;
