"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const travels_1 = require("../../controllers/inputs/travels");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo usuario
router.post("/", travels_1.newTravel);
router.patch("/:id", travels_1.updateTravel);
router.patch("/reject/:id", travels_1.cancelTravel);
exports.default = router;
