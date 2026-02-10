import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "../../shared/auth/AuthProvider"; 
import { ThemeProvider } from "../../features/theme/";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryProvider>
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryProvider>
);