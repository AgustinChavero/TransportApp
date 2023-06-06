"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chauffeur_1 = require("../../controllers/outputs/chauffeur");
const router = (0, express_1.Router)();
// Ruta para obtener choferes
router.get("/", chauffeur_1.allChauffeur);
router.get("/:id", chauffeur_1.searchChauffeur);
router.get("/:name", chauffeur_1.searchChauffeurName);
router.get("/:cc", chauffeur_1.searchChauffeurCc);
router.get("/:ce", chauffeur_1.searchChauffeurCe);
router.get("/patent/:patent", chauffeur_1.searchChauffeurByPatent);
exports.default = router;
