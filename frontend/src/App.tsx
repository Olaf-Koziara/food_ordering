import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Layout } from '@/components/Layout';
import { ToastProvider } from '@/components/ui/Toast';
import { OrderRoutes } from '@/features/order/routes';

const AdminPanel = lazy(() =>
  import('@/features/admin/components/AdminPanel').then((m) => ({
    default: m.AdminPanel,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<OrderRoutes />} />
                <Route
                  path="/admin"
                  element={
                    <Suspense
                      fallback={
                        <div className="text-center py-12">Loading...</div>
                      }
                    >
                      <AdminPanel />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
