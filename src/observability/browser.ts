import { type InitOptions, init } from "@nais/apm";
import { pageIdFromBrowserPath, UNKNOWN_PAGE_ID } from "./routes";

export {
  BROWSER_BASE_PATH,
  pageIdFromBrowserPath,
  UNKNOWN_PAGE_ID,
  UUID_PAGE_ID,
} from "./routes";

export const BROWSER_APM_APP = "aktivitetskrav-frontend";
export const BROWSER_APM_NAMESPACE = "team-esyfo";

const currentOrigin = (): string | undefined =>
  typeof location === "undefined" ? undefined : location.origin;

const parseUrl = (value: string): URL | undefined => {
  try {
    return new URL(value, currentOrigin());
  } catch {
    return undefined;
  }
};

const hasCredentials = (url: URL): boolean =>
  Boolean(url.username || url.password);

const withoutUrlDetails = (url: URL): string => {
  url.search = "";
  url.hash = "";
  return url.href;
};

export function normalizePageUrl(value: string): string {
  const url = parseUrl(value);
  if (!url || hasCredentials(url) || url.origin !== currentOrigin()) {
    return "[page-url]";
  }
  return `${url.origin}${pageIdFromBrowserPath(url.pathname)}`;
}

export function normalizeTelemetryUrl(
  value: string,
  fallback = "[url]",
): string {
  const url = parseUrl(value);
  if (!url || hasCredentials(url)) return fallback;

  if (url.origin === currentOrigin()) {
    const pageId = pageIdFromBrowserPath(url.pathname);
    if (pageId !== UNKNOWN_PAGE_ID) return `${url.origin}${pageId}`;
  }

  return withoutUrlDetails(url);
}

const normalizePayloadUrls = <Payload>(payload: Payload): Payload => {
  if (payload === null || typeof payload !== "object") return payload;

  const source = payload as Record<string, unknown>;
  let normalized = source;

  const stacktrace = source.stacktrace as
    | { frames?: Array<Record<string, unknown>> }
    | undefined;
  if (stacktrace?.frames) {
    normalized = {
      ...normalized,
      stacktrace: {
        ...stacktrace,
        frames: stacktrace.frames.map((frame) => ({
          ...frame,
          ...(typeof frame.filename === "string"
            ? {
                filename: normalizeTelemetryUrl(
                  frame.filename,
                  "[stack-frame]",
                ),
              }
            : {}),
        })),
      },
    };
  }

  const attributes = normalized.attributes as
    | Record<string, unknown>
    | undefined;
  if (
    (normalized.name === "faro.performance.navigation" ||
      normalized.name === "faro.performance.resource") &&
    typeof attributes?.name === "string"
  ) {
    normalized = {
      ...normalized,
      attributes: {
        ...attributes,
        name: normalizeTelemetryUrl(attributes.name, "[resource-url]"),
      },
    };
  }

  return normalized as Payload;
};

type BeforeSend = NonNullable<InitOptions["beforeSend"]>;

export const normalizeBrowserTelemetry: BeforeSend = (item) => {
  const rawPageUrl = item.meta.page?.url;
  if (!rawPageUrl) {
    return { ...item, payload: normalizePayloadUrls(item.payload) };
  }

  const pageUrl = parseUrl(rawPageUrl);
  return {
    ...item,
    payload: normalizePayloadUrls(item.payload),
    meta: {
      ...item.meta,
      page: {
        ...item.meta.page,
        id: pageIdFromBrowserPath(pageUrl?.pathname ?? ""),
        url: normalizePageUrl(rawPageUrl),
      },
    },
  };
};

export const browserApmOptions = {
  app: BROWSER_APM_APP,
  namespace: BROWSER_APM_NAMESPACE,
  beforeSend: normalizeBrowserTelemetry,
  tracing: true,
  faro: {
    pageTracking: {
      generatePageId: (currentLocation) =>
        pageIdFromBrowserPath(currentLocation.pathname),
    },
  },
} satisfies InitOptions;

export const isBrowserTelemetryEnvironment = (
  environment: string | undefined,
): boolean =>
  environment === "dev" || environment === "demo" || environment === "prod";

export function initBrowserObservability() {
  if (
    typeof window === "undefined" ||
    !isBrowserTelemetryEnvironment(process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT)
  ) {
    return undefined;
  }
  return init(browserApmOptions);
}
