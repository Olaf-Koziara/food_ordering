import { z } from 'zod';
import {
    OrderSchema,
    CreateOrderSchema,
    CreateOrderItemSchema,
    OrderItemSchema,
    CustomerDetailsSchema,
} from '../schemas';

export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type CreateOrderItem = z.infer<typeof CreateOrderItemSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type CustomerDetails = z.infer<typeof CustomerDetailsSchema>;
