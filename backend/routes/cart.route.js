import {Router} from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import jwtAuth from "../middlewares/jwtAuth.middleware.js";

const router = Router();

router.post("/add",jwtAuth, addToCart);
router.post("/remove",jwtAuth, removeFromCart);
router.get("/get",jwtAuth, getCart);

export default router;