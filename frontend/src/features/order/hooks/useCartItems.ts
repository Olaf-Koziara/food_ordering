import { Product } from '@food-ordering/shared';

export interface CartEntry {
  product: Product;
  quantity: number;
}

export const useCartItems = (cart: Record<string, CartEntry>) => {
  const items = Object.values(cart).filter((entry) => entry.quantity > 0);

  const totalAmount = items.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );

  const totalItems = items.reduce((sum, entry) => sum + entry.quantity, 0);

  return {
    items,
    totalAmount,
    totalItems,
    isEmpty: items.length === 0,
  };
};
