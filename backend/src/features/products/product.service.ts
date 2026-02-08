import { Product } from '@prisma/client';
import { IProductRepository } from './product.repository';
import { AppError } from '../../shared/utils/AppError';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError(404, `Product with id ${id} not found`);
    }

    return product;
  }
}
