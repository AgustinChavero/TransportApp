import { Router } from "express";
import { getAllTickets, getTicketById, getTicketByUserId } from "../../controllers/outputs/ticket";

const router = Router();

router.get("/", getAllTickets);
router.get("/user/:id", getTicketByUserId);
router.get("/:id", getTicketById);

export default router;
