import { Router } from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";
import fileUpload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", fileUpload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
