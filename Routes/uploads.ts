import { Router } from "express";
import { uploadFiles } from "../controller";

const router = Router()

router.post("/", uploadFiles )

export {
router as uploadsRouter
}