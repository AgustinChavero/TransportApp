import { Router } from "express";
import { acceptTicket, cancelTicket, newTicket } from "../../controllers/inputs/ticket";
import { newTicketValidate } from "../../utils/validations/ticket";

const router = Router();

router.post("/", newTicket);

router.patch("/acept/:id", acceptTicket);

router.patch("/cancel/:id", cancelTicket);

export default router;
