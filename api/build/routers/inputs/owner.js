"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_1 = require("../../controllers/inputs/owner");
const router = (0, express_1.Router)();
// Ruta para crear y actualizar choferes
router.post("/", owner_1.newOwner);
router.put("/:id", owner_1.updateOwner);
router.patch("/enable/:id", owner_1.enableOwner);
router.delete("/delete/:id", owner_1.deleteOwner);
exports.default = router;
