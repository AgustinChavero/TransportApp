"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../../controllers/inputs/company");
const router = (0, express_1.Router)();
//Ruta para crear bondis
router.post("/", company_1.newCompany);
router.put("/:id", company_1.updateCompany);
exports.default = router;
