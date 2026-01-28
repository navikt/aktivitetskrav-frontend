import { logger } from "@navikt/next-logger";

declare global {
  interface Window {
    faro?: {
      api: {
        pushError: (error: Error) => void;
      };
    };
  }
}

export const logError = (error: Error) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(error);
  } else {
    logger.error(error.message);
  }
};
