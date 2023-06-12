"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../../controllers/inputs/notification");
const router = (0, express_1.Router)();
router.post("/", notification_1.newNotification);
exports.default = router;
