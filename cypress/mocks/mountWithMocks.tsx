import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { minutesToMillis } from "@/utils/dateUtils";
import React from "react";
import {
  getAktivitetskravVurderingForScenario,
  TestScenario,
} from "@/utils/testScenarioUtils";

interface ReactQueryProps {
  children: React.JSX.Element;
  mockReactQuery?: boolean;
}

const ReactQueryProvider = ({
  children,
}: ReactQueryProps): React.JSX.Element => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              staleTime: minutesToMillis(30),
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
};
export const mountWithMocks = (
  componentUnderTest: React.JSX.Element,
  testScenario: TestScenario,
) => {
  cy.intercept("/api/aktivitetsplikt", getAktivitetskravVurderingForScenario(testScenario)).as(
    "hentVurdering",
  );

  return mount(<ReactQueryProvider>{componentUnderTest}</ReactQueryProvider>);
};
