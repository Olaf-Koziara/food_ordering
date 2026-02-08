import { Product } from '@food-ordering/shared';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { CartEntry } from '@/features/order/hooks/useCartItems';

interface ProductListProps {
  products: Product[];
  cart: Record<string, CartEntry>;
  onQuantityChange: (product: Product, quantity: number) => void;
}

export const ProductList = ({
  products,
  cart,
  onQuantityChange,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Brak dostępnych produktów
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id]?.quantity || 0}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};
