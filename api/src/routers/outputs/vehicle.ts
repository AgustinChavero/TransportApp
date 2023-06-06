import { Router } from "express";
import {
  getVehicles,
  searchVehicleByPatent,
  searchVehicleByOwner,
  searchVehicleByYear,
  getVehicleById,
  searchVehicleByChauffeur,
  searchVehicleByBrand,
} from "../../controllers/outputs/vehicle";

const router = Router();

// Ruta para obtener vehiculos

router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.get("/patent/:patent", searchVehicleByPatent);
router.get("/chauffeur/:chauffeurId", searchVehicleByChauffeur);
router.get("/owner/:ownerId", searchVehicleByOwner);
router.get("/brand/:brand", searchVehicleByBrand);
router.get("/year/:year", searchVehicleByYear);

export default router;
