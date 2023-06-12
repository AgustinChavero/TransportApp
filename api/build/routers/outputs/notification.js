"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../../controllers/outputs/notification");
const router = (0, express_1.Router)();
router.get("/user/:id", notification_1.searchNotifications);
exports.default = router;
