import { Router } from "express";
import { newBusDriverValidate } from "../../utils/validations/busDriver";
import { newBusDriver, updateBusDriver } from "../../controllers/inputs/busDriver";

const router = Router();

//Ruta creacion de
router.post("/", newBusDriver);
//Ruta actualizar busDriver
router.put("/:id", updateBusDriver);

export default router;
