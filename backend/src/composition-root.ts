import { OrderRepository } from './features/orders/order.repository';
import { ProductRepository } from './features/products/product.repository';
import { OrderService } from './features/orders/order.service';
import { OrderController } from './features/orders/order.controller';
import { ProductService } from './features/products/product.service';
import { ProductController } from './features/products/product.controller';

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();

export const orderService = new OrderService(
  orderRepository,
  productRepository
);
export const orderController = new OrderController(orderService);
export const productService = new ProductService(productRepository);
export const productController = new ProductController(productService);
