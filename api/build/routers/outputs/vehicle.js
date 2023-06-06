"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_1 = require("../../controllers/outputs/vehicle");
const router = (0, express_1.Router)();
// Ruta para obtener vehiculos
router.get("/", vehicle_1.getVehicles);
router.get("/:id", vehicle_1.getVehicleById);
router.get("/patent/:patent", vehicle_1.searchVehicleByPatent);
router.get("/chauffeur/:chauffeurId", vehicle_1.searchVehicleByChauffeur);
router.get("/owner/:ownerId", vehicle_1.searchVehicleByOwner);
router.get("/brand/:brand", vehicle_1.searchVehicleByBrand);
router.get("/year/:year", vehicle_1.searchVehicleByYear);
exports.default = router;
