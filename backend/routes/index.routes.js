import {Router} from 'express'
import foodRoutes from './food.route.js'
import userRoutes from './user.route.js'
import cartRoutes from './cart.route.js'

const router = Router();


router.use("/food", foodRoutes);
router.use("/auth", userRoutes);
router.use("/cart", cartRoutes);

export default router;