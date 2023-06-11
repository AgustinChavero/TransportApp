import { Router } from "express";
import { searchLocal, getLocals, getLocalByProduct } from "../../controllers/outputs/local";

const router = Router();

router.get("/:id", searchLocal);

router.get("/", getLocals); // permite (name) por query, si no lo recibe es un getAll

router.get("/product/:id", getLocalByProduct);

export default router;
