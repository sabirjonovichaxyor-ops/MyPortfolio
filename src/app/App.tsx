import { Suspense } from "react";
import { Providers } from "./providers/providers"; // barcha global providerlar shu yerda
import { Router } from "./router";
import LoadingSpinner from "../shared/ui/ui-decorative/LoadingSpinner";

export default function App() {
  return (
    <Providers>
      {/* Suspense for lazy-loaded routes/pages */}
      <Suspense fallback={<LoadingSpinner />}>
        <Router />
      </Suspense>
    </Providers>
  );
}
