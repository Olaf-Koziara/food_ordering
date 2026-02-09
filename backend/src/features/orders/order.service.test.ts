import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrderService } from './order.service';
import type { IOrderRepository } from './order.repository';
import type { IProductRepository } from '../products/product.repository';
import { AppError } from '../../shared/utils/AppError';
import type { CreateOrder } from '@food-ordering/shared';
import type { Order, Product } from '@prisma/client';

describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: IOrderRepository;
  let mockProductRepository: IProductRepository;

  beforeEach(() => {

    mockOrderRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
    };

    mockProductRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByIds: vi.fn(),
    };

    orderService = new OrderService(mockOrderRepository, mockProductRepository);
  });

  describe('createOrder', () => {
    it('should create order with correct total amount calculation', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Pizza Margherita',
          price: 12.99,
          imageUrl: 'pizza.jpg',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Burger',
          price: 9.99,
          imageUrl: 'burger.jpg',
          createdAt: new Date(),
        },
      ];

      const orderData: CreateOrder = {
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        items: [
          { productId: 1, quantity: 2 }, 
          { productId: 2, quantity: 1 },]
     
      };

      const expectedOrder: Order = {
        id: 1,
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        totalAmount: 35.97,
        createdAt: new Date(),
      };

      vi.mocked(mockProductRepository.findByIds).mockResolvedValue(
        mockProducts
      );
      vi.mocked(mockOrderRepository.create).mockResolvedValue(expectedOrder);

      const result = await orderService.createOrder(orderData);

      expect(mockProductRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(mockOrderRepository.create).toHaveBeenCalledWith({
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        totalAmount: 35.97,
        items: {
          create: [
            { productId: 1, quantity: 2, unitPrice: 12.99 },
            { productId: 2, quantity: 1, unitPrice: 9.99 },
          ],
        },
      });
      expect(result).toEqual(expectedOrder);
      expect(result.totalAmount).toBe(35.97);
    });

    it('should throw AppError when products not found', async () => {
      const orderData: CreateOrder = {
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        items: [{ productId: 999, quantity: 1 }],
      };

      vi.mocked(mockProductRepository.findByIds).mockResolvedValue([]);

      await expect(orderService.createOrder(orderData)).rejects.toThrow(
        AppError
      );
      await expect(orderService.createOrder(orderData)).rejects.toThrow(
        'One or more products not found'
      );
    });

    it('should throw AppError when specific product ID not found', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Pizza',
          price: 12.99,
          imageUrl: 'pizza.jpg',
          createdAt: new Date(),
        },
      ];

      const orderData: CreateOrder = {
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        items: [
          { productId: 1, quantity: 1 },
          { productId: 999, quantity: 1 },
        ],
      };

      vi.mocked(mockProductRepository.findByIds).mockResolvedValue(
        mockProducts
      );

      await expect(orderService.createOrder(orderData)).rejects.toThrow(
        'Product with id 999 not found'
      );
    });

    it('should calculate total for multiple quantities correctly', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Pizza',
          price: 10.0,
          imageUrl: 'pizza.jpg',
          createdAt: new Date(),
        },
      ];

      const orderData: CreateOrder = {
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        items: [{ productId: 1, quantity: 5 }],
      };

      const expectedOrder: Order = {
        id: 1,
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        totalAmount: 50.0,
        createdAt: new Date(),
      };

      vi.mocked(mockProductRepository.findByIds).mockResolvedValue(
        mockProducts
      );
      vi.mocked(mockOrderRepository.create).mockResolvedValue(expectedOrder);

      const result = await orderService.createOrder(orderData);

      expect(result.totalAmount).toBe(50.0);
      expect(mockOrderRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          totalAmount: 50.0,
        })
      );
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders from repository', async () => {
      const mockOrders: Order[] = [
        {
          id: 1,
          customerName: 'Jan Kowalski',
          customerAddress: 'ul. Warszawska 1',
          totalAmount: 35.97,
          createdAt: new Date(),
        },
        {
          id: 2,
          customerName: 'Anna Nowak',
          customerAddress: 'ul. Krakowska 2',
          totalAmount: 25.5,
          createdAt: new Date(),
        },
      ];

      vi.mocked(mockOrderRepository.findAll).mockResolvedValue(mockOrders);

      const result = await orderService.getAllOrders();

      expect(mockOrderRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
      expect(result).toHaveLength(2);
    });
  });

  describe('getOrderById', () => {
    it('should return order when found', async () => {
      const mockOrder: Order = {
        id: 1,
        customerName: 'Jan Kowalski',
        customerAddress: 'ul. Warszawska 1',
        totalAmount: 35.97,
        createdAt: new Date(),
      };

      vi.mocked(mockOrderRepository.findById).mockResolvedValue(mockOrder);


      const result = await orderService.getOrderById(1);


      expect(mockOrderRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder);
    });

    it('should throw AppError when order not found', async () => {

      vi.mocked(mockOrderRepository.findById).mockResolvedValue(null);


      await expect(orderService.getOrderById(999)).rejects.toThrow(AppError);
      await expect(orderService.getOrderById(999)).rejects.toThrow(
        'Order with id 999 not found'
      );
    });
  });
});
