import { Router } from "express";
import { logoutAll } from "../../controllers/inputs/logout";

const router = Router();

router.post("/logout", logoutAll)

export default router;
