import { useState } from 'react';
import type { Order } from '@food-ordering/shared';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { OrderItemsRow } from '@/features/admin/components/OrderItemsRow';

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  if (orders.length === 0) {
    return <div className="text-center py-12 text-gray-500">Brak zamówień</div>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggleOrder(order.id)}
            className="w-full bg-white hover:bg-gray-50 px-6 py-4 flex items-center justify-between transition-colors"
          >
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">
                {`Klient: ${order.customerName}`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {`Adres: ${order.customerAddress}`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(order.createdAt as unknown as string)}
              </p>
            </div>
            <div className="text-right mr-4">
              <p className="font-bold text-lg text-primary-600">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
            <div className="text-gray-400">
              {expandedOrders.has(order.id) ? '▼' : '▶'}
            </div>
          </button>

          {expandedOrders.has(order.id) && order.items && (
            <OrderItemsRow items={order.items} />
          )}
        </div>
      ))}
    </div>
  );
};
