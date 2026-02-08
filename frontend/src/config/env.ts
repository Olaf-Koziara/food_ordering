const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const env = {
  apiUrl,
} as const;
