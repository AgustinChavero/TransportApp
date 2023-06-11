import { Router } from "express";
import { getAllProducts, getAllProductsByType, getAllProductsByStore, getProductId } from "../../controllers/outputs/product";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductId);
router.get("/:productType", getAllProductsByType);
router.get("/store/:store", getAllProductsByStore);

export default router;
