import {
    Product,
    CreateOrder,
    Order,
    ApiResponse,
} from '@food-ordering/shared';
import { env } from '@/config/env';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = env.apiUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getProducts() {
    return this.request<Product[]>('/api/products');
  }

  async createOrder(orderData: CreateOrder) {
    return this.request<Order>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getAdminOrders(token: string) {
    return this.request<Order[]>('/api/admin/orders', {
      headers: {
        'x-admin-token': token,
      },
    });
  }
}

export const apiClient = new ApiClient();
