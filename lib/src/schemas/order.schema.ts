import { z } from 'zod';

export const CustomerDetailsSchema = z.object({
  customerName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  customerAddress: z.string().min(5, 'Adres musi mieć co najmniej 5 znaków'),
});

export const CreateOrderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const OrderItemSchema = CreateOrderItemSchema.extend({
  unitPrice: z.number().positive(),
});

export const CreateOrderSchema = CustomerDetailsSchema.extend({
  items: z
    .array(CreateOrderItemSchema)
    .min(1, 'Zamówienie musi mieć co najmniej jedną pozycję'),
});

export const OrderSchema = z.object({
  id: z.number().int().positive(),
  customerName: z.string(),
  customerAddress: z.string(),
  totalAmount: z.number(),
  createdAt: z.date(),
  items: z.array(
    OrderItemSchema.extend({
      id: z.number().int().positive(),
      orderId: z.number().int().positive(),
      product: z
        .object({
          id: z.number().int().positive(),
          name: z.string(),
          price: z.number(),
          imageUrl: z.string().nullable().optional(),
        })
        .optional(),
    })
  ),
});
