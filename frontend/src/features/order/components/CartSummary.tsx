import type { CartEntry } from '@/features/order/hooks/useCartItems';
import { useCartItems } from '@/features/order/hooks/useCartItems';
import { formatCurrency } from '@/utils/formatters';

interface CartSummaryProps {
  cart: Record<string, CartEntry>;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  const { items, totalAmount, isEmpty } = useCartItems(cart);

  if (isEmpty) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <h3 className="font-semibold text-gray-900 mb-2">Podsumowanie koszyka</h3>
      <ul className="space-y-1">
        {items.map((entry) => (
          <li key={entry.product.id} className="flex justify-between text-sm">
            <span>
              {entry.product.name} × {entry.quantity}
            </span>
            <span className="font-medium">
              {formatCurrency(entry.product.price * entry.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
        <span>Razem</span>
        <span>{formatCurrency(totalAmount)}</span>
      </div>
    </div>
  );
};
