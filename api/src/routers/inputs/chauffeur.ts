import { Router } from "express";
import {
  newChauffeur,
  updateChauffeur,
  deleteChauffeur,
  enableChauffeur,
} from "../../controllers/inputs/chauffeur";
import { newChauffeurValidated, updateChauffeurValidated } from "../../utils/validations/chauffeur";

const router = Router();

// Ruta para crear y actualizar choferes
router.post("/", newChauffeur);
router.put("/:id", updateChauffeur);
router.patch("/enable/:id", enableChauffeur);
router.delete("/delete/:id", deleteChauffeur);

export default router;
