import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.getProducts();
      return response.data || [];
    },
  });
};
