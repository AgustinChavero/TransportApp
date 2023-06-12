"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const travels_1 = require("../../controllers/outputs/travels");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo usuario
router.get("/", travels_1.getAllTravel);
router.get("/:id", travels_1.searchTravel);
router.get("/user/:userId", travels_1.travelByUser);
router.get("/chauffeur/:chauffeurId", travels_1.travelByChauffeur);
exports.default = router;
