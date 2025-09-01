import { Router } from "express";
import foodRoutes from "./food.route.js";
import userRoutes from "./user.route.js";
import cartRoutes from "./cart.route.js";
import orderRoutes from "./order.route.js";

const router = Router();

router.use("/food", foodRoutes);
router.use("/auth", userRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

export default router;
