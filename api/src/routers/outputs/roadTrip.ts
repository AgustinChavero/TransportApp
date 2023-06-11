import { Router } from "express";
import { searhBusDriver } from "../../controllers/outputs/busDriver";

const router = Router();
router.get("/");
//obtener bus driver por id
router.get("/:id", searhBusDriver);
export default router;
