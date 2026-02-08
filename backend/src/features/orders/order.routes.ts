import { Router, type IRouter } from 'express';
import { orderController } from '../../composition-root';
import { validateRequest } from '../../shared/middleware/validateRequest';
import { CreateOrderSchema } from '@food-ordering/shared';

const router: IRouter = Router();

router.post('/', validateRequest(CreateOrderSchema), orderController.create);

export default router;
