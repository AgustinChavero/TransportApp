"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const local_1 = require("../../controllers/outputs/local");
const router = (0, express_1.Router)();
router.get("/:id", local_1.searchLocal);
router.get("/", local_1.getLocals); // permite (name) por query, si no lo recibe es un getAll
router.get("/product/:id", local_1.getLocalByProduct);
exports.default = router;
