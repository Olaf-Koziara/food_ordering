import { useState } from 'react';
import { AdminLogin } from '@/features/admin/components/AdminLogin';
import { OrdersTable } from '@/features/admin/components/OrdersTable';
import { useAdminOrders } from '@/features/admin/hooks/useAdminOrders';
import { Button } from '@/components/ui/Button';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export const AdminPanel = () => {
  const [token, setToken] = useState<string | null>(null);
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useAdminOrders(token || '');

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Panel zamówień</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            Odśwież
          </Button>
          <Button variant="danger" onClick={() => setToken(null)}>
            Wyloguj
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-red-500">
          Nie udało się załadować zamówień. Sprawdź token administatora.
        </div>
      )}

      {orders && <OrdersTable orders={orders} />}
    </div>
  );
};
