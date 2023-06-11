import { Router } from "express";
import { newRoadTrip, roadTripUpdate } from "../../controllers/inputs/roadTrip";

const router = Router();
router.post("/", newRoadTrip);
//Ruta actualizar busDriver
router.put("/:id", roadTripUpdate);

export default router;
