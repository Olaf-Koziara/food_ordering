import { useState, useCallback } from 'react';
import type { Product, CustomerDetails, Order } from '@food-ordering/shared';
import type { CartEntry } from '@/features/order/hooks/useCartItems';
import { useCartPersistence } from '@/features/order/hooks/useCartPersistence';
import { useCreateOrder } from '@/features/order/hooks/useCreateOrder';
import { useToast } from '@/components/ui/Toast';
import { ProductStep } from '@/features/order/components/ProductStep';
import { CustomerStep } from '@/features/order/components/CustomerStep';
import { OrderSuccess } from '@/features/order/components/OrderSuccess';

type Step = 'products' | 'details' | 'success';

export const OrderForm = () => {
  const { persistedCart, persistCart, clearPersistedCart } =
    useCartPersistence();
  const [cart, setCart] = useState<Record<string, CartEntry>>(persistedCart);
  const [step, setStep] = useState<Step>('products');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const createOrder = useCreateOrder();
  const { showToast } = useToast();

  const handleQuantityChange = useCallback(
    (product: Product, quantity: number) => {
      setCart((prev) => {
        const next = { ...prev };
        if (quantity <= 0) {
          delete next[product.id];
        } else {
          next[product.id] = { product, quantity };
        }
        persistCart(next);
        return next;
      });
    },
    [persistCart]
  );

  const handleCustomerSubmit = async (customerDetails: CustomerDetails) => {
    const items = Object.values(cart)
      .filter((entry) => entry.quantity > 0)
      .map((entry) => ({
        productId: entry.product.id,
        quantity: entry.quantity,
      }));

    try {
      const response = await createOrder.mutateAsync({
        ...customerDetails,
        items,
      });

      if (response.data) {
        setCompletedOrder(response.data);
        setStep('success');
        setCart({});
        clearPersistedCart();
      }
    } catch {
      showToast('Failed to place order. Please try again.', 'error');
    }
  };

  const handleNewOrder = () => {
    setCompletedOrder(null);
    setStep('products');
  };

  if (step === 'success' && completedOrder) {
    return <OrderSuccess order={completedOrder} onNewOrder={handleNewOrder} />;
  }

  if (step === 'details') {
    return (
      <CustomerStep
        onSubmit={handleCustomerSubmit}
        onBack={() => setStep('products')}
        isSubmitting={createOrder.isPending}
      />
    );
  }

  return (
    <ProductStep
      cart={cart}
      onQuantityChange={handleQuantityChange}
      onNext={() => setStep('details')}
    />
  );
};
