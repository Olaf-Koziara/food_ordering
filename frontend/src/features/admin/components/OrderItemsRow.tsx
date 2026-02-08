import type { Order } from '@food-ordering/shared';
import { formatCurrency } from '@/utils/formatters';

interface OrderItemsRowProps {
  items: Order['items'];
}

export const OrderItemsRow = ({ items }: OrderItemsRowProps) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 text-sm mb-3">
          Pozycje w zamówieniu
        </h4>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between bg-white rounded-md px-3 py-2 text-sm"
            >
              <div className="flex-1">
                <span className="font-medium text-gray-900">
                  {item.product?.name ?? 'Nieznany produkt'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="text-gray-600">Ilość: {item.quantity}</span>
                <span className="font-semibold text-gray-900 min-w-[80px]">
                  {formatCurrency(item.unitPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
