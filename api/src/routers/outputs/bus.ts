import { Router } from "express";
import {
  getBus,
  searchBusByPatent,
  searchBusByNumber,
  getBusById,
} from "../../controllers/outputs/bus";

const router = Router();

//Rutas para obtener bondis

router.get("/", getBus);
router.get("/:id", getBusById);
router.get("/patent/:patent", searchBusByPatent);
router.get("/number_bus/:number_bus", searchBusByNumber);

export default router;
