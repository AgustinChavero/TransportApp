import { Router } from "express";
import {
  newProduct,
  updateProduct,
  deletedProduct,
  enableProduct,
} from "../../controllers/inputs/product";
import { newProductValidated, updateProductValidated } from "../../utils/validations/products";

const router = Router();

router.post("/", newProduct);
router.put("/:id", updateProduct);
router.patch("/enable/:id", enableProduct);
router.delete("/delete/:id", deletedProduct);

export default router;
