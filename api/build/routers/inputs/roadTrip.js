"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roadTrip_1 = require("../../controllers/inputs/roadTrip");
const router = (0, express_1.Router)();
router.post("/", roadTrip_1.newRoadTrip);
//Ruta actualizar busDriver
router.put("/:id", roadTrip_1.roadTripUpdate);
exports.default = router;
