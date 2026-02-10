// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,              // xato bo‘lsa 1 marta qayta urinish
      refetchOnWindowFocus: false, // oynaga qaytganda qayta so‘ramaslik
      staleTime: 1000 * 60,  // 1 minut davomida ma'lumot "fresh"
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
