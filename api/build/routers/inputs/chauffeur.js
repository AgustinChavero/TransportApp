"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chauffeur_1 = require("../../controllers/inputs/chauffeur");
const router = (0, express_1.Router)();
// Ruta para crear y actualizar choferes
router.post("/", chauffeur_1.newChauffeur);
router.put("/:id", chauffeur_1.updateChauffeur);
router.patch("/enable/:id", chauffeur_1.enableChauffeur);
router.delete("/delete/:id", chauffeur_1.deleteChauffeur);
exports.default = router;
