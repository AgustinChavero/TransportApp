"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_1 = require("../../controllers/inputs/ticket");
const router = (0, express_1.Router)();
router.post("/", ticket_1.newTicket);
router.patch("/acept/:id", ticket_1.acceptTicket);
router.patch("/cancel/:id", ticket_1.cancelTicket);
exports.default = router;
