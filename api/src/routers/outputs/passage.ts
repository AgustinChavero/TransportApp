import { Router } from "express";
import { getAllPassages, getLocations, getPassageById } from "../../controllers/outputs/passage";

const router = Router();

//Ruta para crear bondis

router.get("/", getAllPassages);

router.get("/locations", getLocations);

router.get("/:id", getPassageById);

export default router;
