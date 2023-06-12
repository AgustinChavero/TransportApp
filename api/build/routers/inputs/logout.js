"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_1 = require("../../controllers/inputs/logout");
const router = (0, express_1.Router)();
router.post("/logout", logout_1.logoutAll);
exports.default = router;
