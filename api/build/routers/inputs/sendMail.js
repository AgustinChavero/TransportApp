"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendMail_1 = require("../../controllers/inputs/sendMail");
const router = (0, express_1.Router)();
router.post("/", sendMail_1.sendMail);
exports.default = router;
