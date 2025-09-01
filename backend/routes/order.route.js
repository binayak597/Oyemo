import {Router} from "express";
import jwtAuth from "../middlewares/jwtAuth.middleware.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/place",jwtAuth,placeOrder);
router.post("/verify",verifyOrder);
router.post("/status",jwtAuth,updateStatus);
router.get("/userorders",jwtAuth,userOrders);
router.get("/list",jwtAuth,listOrders);

export default router;