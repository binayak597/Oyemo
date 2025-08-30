import {Router} from 'express'
import foodRoutes from './food.route.js'
import userRoutes from './user.route.js'

const router = Router();


router.use("/food", foodRoutes);
router.use("/auth", userRoutes);

export default router;