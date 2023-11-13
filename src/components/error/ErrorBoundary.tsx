import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import PageError from "./PageError";
import { logError } from "@/utils/logUtils";

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
