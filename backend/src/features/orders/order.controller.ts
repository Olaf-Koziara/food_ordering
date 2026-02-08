import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { ApiResponse, CreateOrder } from '@food-ordering/shared';
import { Order } from '@prisma/client';

export class OrderController {
  constructor(private orderService: OrderService) {}

  create = async (
    req: Request<unknown, unknown, CreateOrder>,
    res: Response<ApiResponse<Order>>,
    next: NextFunction
  ) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        data: order,
        message: 'Order created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    _req: Request,
    res: Response<ApiResponse<Order[]>>,
    next: NextFunction
  ) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response<ApiResponse<Order>>,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id!);
      const order = await this.orderService.getOrderById(id);
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };
}
