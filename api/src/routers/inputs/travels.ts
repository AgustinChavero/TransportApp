import { Router } from "express";
import { cancelTravel, newTravel, updateTravel } from "../../controllers/inputs/travels";
import { newTravelValidated, updateTravelValidated } from "../../utils/validations/travels";

const router = Router();

// Ruta para crear un nuevo usuario

router.post("/", newTravel);

router.patch("/:id", updateTravel);
router.patch("/reject/:id", cancelTravel);

export default router;
