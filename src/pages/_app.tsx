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
import { TestScenarioSelector } from "@/components/testscenarioselector/TestScenarioSelector";
import { initFaro } from "@/faro/initFaro";
import { minutesToMillis } from "@/utils/dateUtils";
import { getTestScenario, setTestScenario } from "@/utils/testScenarioUtils";

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
