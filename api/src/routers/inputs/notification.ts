import { Router } from "express";
import { newNotification } from "../../controllers/inputs/notification";


const router = Router();

router.post("/", newNotification)

export default router;
