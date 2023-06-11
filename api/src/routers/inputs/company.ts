import { Router } from "express";
import { newCompany, updateCompany } from "../../controllers/inputs/company";

const router = Router();

//Ruta para crear bondis

router.post("/", newCompany);
router.put("/:id", updateCompany);

export default router;
