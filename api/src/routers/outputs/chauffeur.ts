import { Router } from "express";
import { searchChauffeur, allChauffeur, searchChauffeurByPatent, searchChauffeurName, searchChauffeurCc, searchChauffeurCe } from "../../controllers/outputs/chauffeur";

const router = Router();

// Ruta para obtener choferes
router.get("/", allChauffeur);
router.get("/:id", searchChauffeur);
router.get("/:name", searchChauffeurName);
router.get("/:cc", searchChauffeurCc);
router.get("/:ce", searchChauffeurCe);
router.get("/patent/:patent", searchChauffeurByPatent);

export default router;