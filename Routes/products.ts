import { Router } from "express";
import {
  deleteProduct,
  getProducts,
  getProductsById,
  postProduct,
  putProduct,
} from "../controller";
import { validateJWT } from "../middlewares";

const router = Router(); 

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/",[validateJWT], postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export { router as productsRouter };
