import { z } from 'zod';
import { ProductSchema, CreateProductSchema } from '../schemas';

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
