import { Router } from "express";
import { searchOrder, getOrders, getOrdersByUserId } from "../../controllers/outputs/order";

const router = Router();

// Ruta para obtener un usuario por su ID
router.get("/", getOrders);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:id", searchOrder);

export default router;
