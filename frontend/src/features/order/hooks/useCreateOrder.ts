import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import type { CreateOrder } from '@food-ordering/shared';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (order: CreateOrder) => apiClient.createOrder(order),
  });
};
