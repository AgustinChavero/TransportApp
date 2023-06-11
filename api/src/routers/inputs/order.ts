import { Router } from "express";
import { newOrder, orderStateUpdate, updateOrder } from "../../controllers/inputs/order";
import { newOrderValidate } from "../../utils/validations/order";

const router = Router();

//Ruta creancion Orden
router.post("/", newOrder);
//Ruta actualizar Orden
router.put("/:id", updateOrder);
//Ruta de actualizar estado de Orden
router.put("/orderStateUpdate/:id", orderStateUpdate);

export default router;
