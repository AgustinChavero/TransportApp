import { Router } from "express";
import {
  updateVehicle,
  deleteVehicle,
  enableVehicle,
  newVehicleByChauffeur,
  newVehicleByDelivery,
} from "../../controllers/inputs/vehicle";
import {
  newVehicleValidateByChauffeur,
  newVehicleValidateByDealer,
  updateVehicleValidate,
} from "../../utils/validations/vehicle";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB size limit
  },
});

// Ruta para crear vehiculos

router.post("/chauffeur", upload.single("img"), newVehicleByChauffeur);
router.post("/delivery", newVehicleByDelivery);
router.put("/:id", updateVehicle);
router.patch("/enable/:id", enableVehicle);
router.delete("/delete/:id", deleteVehicle);

export default router;
