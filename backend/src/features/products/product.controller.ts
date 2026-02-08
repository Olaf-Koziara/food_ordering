import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { ApiResponse } from '@food-ordering/shared';
import { Product } from '@prisma/client';

export class ProductController {
  constructor(private productService: ProductService) {}

  getAll = async (
    _req: Request,
    res: Response<ApiResponse<Product[]>>,
    next: NextFunction
  ) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response<ApiResponse<Product>>,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id!);
      const product = await this.productService.getProductById(id);
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
}
