import { Router } from "express";
import { getImgFile, updateFileUpload, uploadFiles } from "../controller";
import { check } from "express-validator";
import { validateCollection, validateFields, validateFiles } from "../middlewares";

const router = Router()

router.post("/", validateFiles, uploadFiles )
router.put("/:collection/:id", [
    validateFiles,
    check("id", "not valid ID").isMongoId(),
    check("collection").custom(validateCollection),
    validateFields
], updateFileUpload )
router.get("/:collection/:id", [
    check("id", "not valid ID").isMongoId(),
    check("collection").custom(validateCollection),
    validateFields
], getImgFile )

export {
router as uploadsRouter
}