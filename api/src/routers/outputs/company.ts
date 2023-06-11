import { Router } from "express";
import { getCompanies, getCompanyByName } from "../../controllers/outputs/company";

const router = Router();

//Rutas para obtener bondis

router.get("/", getCompanies);
router.get("/:id", getCompanyByName);

export default router;
