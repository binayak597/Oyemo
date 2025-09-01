import { Router } from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";

const router = Router();

router.post("/add", addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
