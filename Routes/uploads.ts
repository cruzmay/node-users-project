import { Router } from "express";
import { uploadFile } from "../controller";

const router = Router()

router.post("/", uploadFile )

export {
router as uploadsRouter
}