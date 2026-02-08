import { Order, Prisma } from '@prisma/client';
import { prisma } from '../../shared/config/database';

export interface IOrderRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
}

export class OrderRepository implements IOrderRepository {
  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
      data,
      include: {
        items: true,
      },
    });
  }

  async findAll(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
