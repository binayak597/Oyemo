import {Router} from 'express'
import foodRoutes from './food.route.js'

const router = Router();


router.use("/food", foodRoutes);

export default router;