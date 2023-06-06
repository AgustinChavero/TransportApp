import { Router } from "express";
import { searchDelivery, getDelivery } from "../../controllers/outputs/delivery";

const router = Router();

// Ruta para obtener un usuario por su ID
router.get("/:id", searchDelivery);
router.get("/", getDelivery);

export default router;
