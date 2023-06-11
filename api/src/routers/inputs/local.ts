import { Router } from "express";
import { deleteLocal, newLocal, updateLocal, enableLocal } from "../../controllers/inputs/local";
import { newLocalValidate, updateLocalValidate } from "../../utils/validations/local";

const router = Router();

router.post("/", newLocal);
router.put("/:id", updateLocal);
router.patch("/enable/:id", enableLocal);
router.delete("/delete/:id", deleteLocal);

export default router;
