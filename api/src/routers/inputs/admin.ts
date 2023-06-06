import { Router } from "express";
import {
  disableSeatsPassage,
  updateAdminStatus,
  updateSeatPassage,
  updateStatusChauffeur,
  updateStatusDelivery,
  updateStatusVehicle,
} from "../../controllers/inputs/admin";

const router = Router();

router.put("/status", updateAdminStatus);
router.patch("/changeStatusChauffeur/:id", updateStatusChauffeur);
router.patch("/changeStatusDelivery/:id", updateStatusDelivery);
router.patch("/changeStatusVehicle/:id", updateStatusVehicle);
router.put("/enableSeats/:id", updateSeatPassage);
router.put("/disableSeats/:id", disableSeatsPassage);

export default router;
