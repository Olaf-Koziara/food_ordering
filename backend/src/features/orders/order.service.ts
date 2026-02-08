import { Order } from '@prisma/client';
import { IOrderRepository } from './order.repository';
import { IProductRepository } from '../products/product.repository';
import { AppError } from '../../shared/utils/AppError';
import { CreateOrder } from '@food-ordering/shared';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository
  ) {}

  async createOrder(orderData: CreateOrder): Promise<Order> {
    const productIds = orderData.items.map((item) => item.productId);
    const products = await this.productRepository.findByIds(productIds);

    if (!products || products.length === 0) {
      throw new AppError(404, 'One or more products not found');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of orderData.items) {
      if (!productMap.has(item.productId)) {
        throw new AppError(
          404,
          `Product with id ${item.productId} not found`
        );
      }
    }

    const totalAmount = orderData.items.reduce((sum, item) => {
      const product = productMap.get(item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);

    return this.orderRepository.create({
      customerName: orderData.customerName,
      customerAddress: orderData.customerAddress,
      totalAmount,
      items: {
        create: orderData.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: productMap.get(item.productId)!.price,
        })),
      },
    });
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError(404, `Order with id ${id} not found`);
    }

    return order;
  }
}
