"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passage_1 = require("../../controllers/outputs/passage");
const router = (0, express_1.Router)();
//Ruta para crear bondis
router.get("/", passage_1.getAllPassages);
router.get("/locations", passage_1.getLocations);
router.get("/:id", passage_1.getPassageById);
exports.default = router;
