import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { configureLogger } from "@navikt/next-logger";
import { minutesToMillis } from "@/utils/dateUtils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { initFaro } from "@/faro/initFaro";
import { TestScenarioSelector } from "@/components/testscenarioselector/TestScenarioSelector";
import { getTestScenario, setTestScenario } from "@/utils/testScenarioUtils";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { createBreadcrumbs } from "@/breadcrumbs/breadcrumbs";

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
    initFaro();
  }, []);

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbs(pathname));
  }, [pathname]);

  const TestScenarioDevTools = () => {
    if (
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
    ) {
      const hasActiveScenario = !!getTestScenario();
      if (!hasActiveScenario) {
        setTestScenario("FORHANDSVARSEL");
      }

      return <TestScenarioSelector />;
    }
    return null;
  };

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
