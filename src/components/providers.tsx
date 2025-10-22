"use client";

import { ReactNode, useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { BProgress } from "@bprogress/core";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

// Singleton QueryClient (re-created only on hot reload)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();

  // Configure once
  useEffect(() => {
    BProgress.configure({
      speed: 350,
      trickleSpeed: 150,
      showSpinner: false,
    });
  }, []);

  useEffect(() => {
    BProgress.start();
    const timeout = setTimeout(() => BProgress.done(), 400);
    return () => clearTimeout(timeout);
  }, [pathname, search]);

  return null;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouteProgress />
          {children}
          <Toaster />
        </NuqsAdapter>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
