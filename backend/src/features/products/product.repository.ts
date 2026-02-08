import { Product } from '@prisma/client';
import { prisma } from '../../shared/config/database';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findByIds(ids: number[]): Promise<Product[]>;
}

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    return prisma.product.findMany({
      where: { id: { in: ids } },
    });
  }
}
