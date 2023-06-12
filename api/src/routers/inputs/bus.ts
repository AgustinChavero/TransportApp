import { Router } from "express";
import { newBus, updateBus, deleteBus, enableBus } from "../../controllers/inputs/bus";

const router = Router();

//Ruta para crear bondis

router.post("/", newBus);
router.put("/:id", updateBus);
router.patch("/:id", enableBus);
router.delete("/:id", deleteBus);

export default router;
