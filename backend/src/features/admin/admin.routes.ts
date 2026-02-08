import { Router, type IRouter } from 'express';
import { orderController } from '../../composition-root';
import { adminAuth } from './admin.middleware';
import { adminRateLimiter } from '../../shared/middleware/rateLimiter';

const router: IRouter = Router();

router.use(adminAuth);
router.use(adminRateLimiter);

router.get('/orders', orderController.getAll);

export default router;
