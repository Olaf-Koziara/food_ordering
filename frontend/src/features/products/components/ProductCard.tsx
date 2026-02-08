import { Product } from '@food-ordering/shared';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (product: Product, quantity: number) => void;
}

export const ProductCard = ({
  product,
  quantity,
  onQuantityChange,
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Brak zdjęcia
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-primary-600 font-bold mt-1">
          {formatCurrency(product.price)}
        </p>
        <div className="flex items-center mt-3 space-x-3">
          <button
            onClick={() => onQuantityChange(product, Math.max(0, quantity - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity === 0}
          >
            −
          </button>
          <span className="text-lg font-medium w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(product, quantity + 1)}
            className="w-8 h-8 rounded-full border border-primary-300 bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100"
          >
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
