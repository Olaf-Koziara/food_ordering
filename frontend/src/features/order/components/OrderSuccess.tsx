import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Order } from '@food-ordering/shared';
import { formatCurrency } from '@/utils/formatters';

interface OrderSuccessProps {
  order: Order;
  onNewOrder: () => void;
}

export const OrderSuccess = ({ order, onNewOrder }: OrderSuccessProps) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Zamówienie potwierdzone!
        </h2>
        <p className="text-gray-600 mb-4">
          Dziękuję, {order.customerName}! Twoje zamówienie zostało złożone.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">
            ID zamówienia:{' '}
            <span className="font-mono font-medium">{order.id}</span>
          </p>
          <p className="text-sm text-gray-500">
            Razem:{' '}
            <span className="font-bold text-primary-600">
              {formatCurrency(order.totalAmount)}
            </span>
          </p>
        </div>
        <Button onClick={onNewOrder} className="w-full">
          Nowe zamówienie
        </Button>
      </Card>
    </div>
  );
};
