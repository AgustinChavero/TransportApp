import { Router } from "express";
import { searchAllOwners, searchOwner } from "../../controllers/outputs/owner";

const router = Router();

// Ruta para obtener choferes
router.get("/", searchAllOwners);
router.get("/:id", searchOwner);
// router.get("/patent/:patent", searchOwnerByPatent);

export default router;
