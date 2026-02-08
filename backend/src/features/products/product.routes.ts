import { Router, type IRouter } from 'express';
import { productController } from '../../composition-root';

const router: IRouter = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

export default router;
