import { Router } from "express";
import {
  deleteProduct,
  getProducts,
  getProductsById,
  postProduct,
  putProduct,
} from "../controller";
import { validateFields, validateJWT } from "../middlewares";
import { check } from "express-validator";
import { categoryExist, productExist } from "../helpers";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  [
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(productExist),
    validateFields,
  ],
  getProductsById
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is Mandatory").notEmpty(),
    check("category", "is not a valid mongo ID").isMongoId(),
    check("category").custom(categoryExist),
    validateFields,
  ],
  postProduct
);
router.put(
  "/:id",
  [
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(productExist),
    validateFields,
  ],
  putProduct
);
router.delete(
  "/:id",
  [
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(productExist),
    validateFields,
  ],
  deleteProduct
);

export { router as productsRouter };
