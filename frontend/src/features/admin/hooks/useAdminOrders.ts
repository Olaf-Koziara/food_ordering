import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export const useAdminOrders = (token: string) => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await apiClient.getAdminOrders(token);
      return response.data || [];
    },
    enabled: !!token,
    refetchInterval: 30_000,
  });
};
