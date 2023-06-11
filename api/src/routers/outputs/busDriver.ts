import { Router } from "express";
import { getBusDriver, searhBusDriver } from "../../controllers/outputs/busDriver";

const router = Router();

router.get("/", getBusDriver);
//obtener bus driver por id
router.get("/:id", searhBusDriver);

export default router;
