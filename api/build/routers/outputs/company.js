"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../../controllers/outputs/company");
const router = (0, express_1.Router)();
//Rutas para obtener bondis
router.get("/", company_1.getCompanies);
router.get("/:id", company_1.getCompanyByName);
exports.default = router;
