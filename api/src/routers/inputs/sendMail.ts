import { Router } from "express";
import { sendMail } from "../../controllers/inputs/sendMail";

const router = Router();
router.post("/", sendMail);
export default router;
