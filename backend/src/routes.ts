import { Router, type IRouter } from 'express';
import productRoutes from './features/products/product.routes';
import orderRoutes from './features/orders/order.routes';
import adminRoutes from './features/admin/admin.routes';

const router: IRouter = Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

export default router;
