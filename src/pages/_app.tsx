import "../styles/globals.css";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { configureLogger } from "@navikt/next-logger";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createBreadcrumbs } from "@/breadcrumbs/breadcrumbs";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { TestScenarioDevTools } from "@/components/testscenarioselector/TestScenarioDevTools";
import { minutesToMillis } from "@/utils/dateUtils";

configureLogger({
  basePath: "/syk/aktivitetskrav",
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const { pathname } = useRouter();
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
    setBreadcrumbs(createBreadcrumbs(pathname));
  }, [pathname]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <main tabIndex={-1} id="maincontent">
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </HydrationBoundary>
          <TestScenarioDevTools />
        </main>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
