import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CartEntry } from '@/features/order/hooks/useCartItems';

const CART_STORAGE_KEY = 'food-ordering-cart';

export const useCartPersistence = () => {
  const [persistedCart, setPersistedCart] = useLocalStorage<
    Record<string, CartEntry>
  >(CART_STORAGE_KEY, {});

  const getPersistedCart = (): Record<string, CartEntry> => {
    return persistedCart;
  };

  const persistCart = (cart: Record<string, CartEntry>) => {
    setPersistedCart(cart);
  };

  const clearPersistedCart = () => {
    setPersistedCart({});
  };

  return {
    getPersistedCart,
    persistCart,
    clearPersistedCart,
    persistedCart,
  };
};
