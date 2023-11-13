import { logger } from "@navikt/next-logger";

// eslint-disable-next-line
declare const window: any;
export const logError = (error: Error) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(error);
  } else {
    logger.error(error.message);
  }
};
