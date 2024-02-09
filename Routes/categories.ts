import { Request, Router, request } from "express";
import { hasRole, validateFields, validateJWT } from "../middlewares";
import { check } from "express-validator";
import {
  categoriesPost,
  deleteCategory,
  getCategories,
  getCategory,
  putCategory,
} from "../controller";
import { categoryExist } from "../helpers";
import { UserRoleEnum } from "../interfaces";

const router = Router();

router.get("/", [validateJWT], getCategories);
router.get(
  "/:id",
  [
    check("id", "is not a valid ID").isMongoId(),
    check("id").custom(categoryExist),
    validateFields,
  ],
  getCategory
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is mandatory").notEmpty(),
    validateFields,
  ],
  categoriesPost
);
router.put(
  "/:id",
  [
    check("id", "is not a valid ID").isMongoId(),
    check("id").custom(categoryExist),
    check("name", "name is mandatory").notEmpty(),
    validateFields,
  ],
  putCategory
);
router.delete(
  "/:id",
  [
    check("id", "is not a valid ID").isMongoId(),
    check("id").custom(categoryExist),
    validateFields,
  ],
  deleteCategory
);

export { router as categoriesRouter };
