import type { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { logError } from "@/utils/logUtils";
import PageError from "./PageError";

interface Props {
  children: ReactNode;
}

export const ErrorBoundary = ({ children }: Props) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={() => <PageError />}
      onError={logError}
    >
      {children}
    </ReactErrorBoundary>
  );
};
