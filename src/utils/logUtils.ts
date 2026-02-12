import { logger } from "@navikt/next-logger";
import type { ErrorInfo } from "react";

declare global {
  interface Window {
    faro?: {
      api: {
        pushError: (error: Error) => void;
      };
    };
  }
}

export const logError = (error: unknown, info: ErrorInfo) => {
  const errorInstance =
    error instanceof Error ? error : new Error(String(error));

  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(errorInstance);
  } else {
    logger.error(
      { error, componentStack: info.componentStack },
      "Component error details",
    );
  }
};
