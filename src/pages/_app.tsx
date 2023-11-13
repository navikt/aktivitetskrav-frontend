import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureLogger } from "@navikt/next-logger";
import { minutesToMillis } from "@/utils/dateUtils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { initFaro } from "@/faro/initFaro";

configureLogger({
  basePath: "/syk/aktivitetskrav",
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: minutesToMillis(30),
          },
        },
      }),
  );

  useEffect(() => {
    initFaro();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <main tabIndex={-1} id="maincontent" className="min-h-screen">
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </HydrationBoundary>
        </main>
        {/*<MswEnabler />*/}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
