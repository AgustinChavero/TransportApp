import { Router } from "express";
import { searchNotifications } from "../../controllers/outputs/notification";

const router = Router();

router.get("/user/:id", searchNotifications);

export default router;
