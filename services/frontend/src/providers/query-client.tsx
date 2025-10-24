"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, ReactNode, useState } from "react";

export function QCProvider({ children }: { children: ReactNode }) {
   const [qc] = useState(new QueryClient());

   return (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
   )
}