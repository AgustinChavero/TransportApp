"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busDriver_1 = require("../../controllers/outputs/busDriver");
const router = (0, express_1.Router)();
router.get("/");
//obtener bus driver por id
router.get("/:id", busDriver_1.searhBusDriver);
exports.default = router;
