"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_1 = require("../../controllers/outputs/ticket");
const router = (0, express_1.Router)();
router.get("/", ticket_1.getAllTickets);
router.get("/user/:id", ticket_1.getTicketByUserId);
router.get("/:id", ticket_1.getTicketById);
exports.default = router;
