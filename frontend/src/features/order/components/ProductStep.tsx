import { Product } from '@food-ordering/shared';
import { ProductList } from '@/features/products/components/ProductList';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { CartSummary } from '@/features/order/components/CartSummary';
import { Button } from '@/components/ui/Button';
import type { CartEntry } from '@/features/order/hooks/useCartItems';
import { useCartItems } from '@/features/order/hooks/useCartItems';

interface ProductStepProps {
  cart: Record<string, CartEntry>;
  onQuantityChange: (product: Product, quantity: number) => void;
  onNext: () => void;
}

export const ProductStep = ({
  cart,
  onQuantityChange,
  onNext,
}: ProductStepProps) => {
  const { data: products, isLoading, isError } = useProducts();
  const { isEmpty } = useCartItems(cart);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Nie udało się załadować produktów. Spróbuj później.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Wybierz produkty
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <ProductList
            products={products || []}
            cart={cart}
            onQuantityChange={onQuantityChange}
          />
        </div>

        <div className="w-80 flex-shrink-0">
          <div className="sticky top-6">
            <CartSummary cart={cart} />
            <Button onClick={onNext} disabled={isEmpty} className="w-full mt-4">
              Przejdź do szczegółów
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
