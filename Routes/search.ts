import { Router } from "express"
import {
  search,
} from "../controller"


const router = Router();

router.get("/:collection/:item", search);


export { router as searchRouter }
