"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_1 = require("../../controllers/outputs/owner");
const router = (0, express_1.Router)();
// Ruta para obtener choferes
router.get("/", owner_1.searchAllOwners);
router.get("/:id", owner_1.searchOwner);
// router.get("/patent/:patent", searchOwnerByPatent);
exports.default = router;
