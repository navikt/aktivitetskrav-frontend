import {
  type InitOptions,
  init,
  isLocalHost,
  isInitialized,
  pushEvent,
} from "@nais/apm";
import {
  BROWSER_BASE_PATH,
  pageIdFromBrowserPath,
  sensitiveRouteValues,
  UNKNOWN_PAGE_ID,
} from "./routes";

export {
  BROWSER_BASE_PATH,
  pageIdFromBrowserPath,
  pageIdFromNextRoute,
  UNKNOWN_PAGE_ID,
  UUID_PAGE_ID,
} from "./routes";

export const BROWSER_APM_APP = "aktivitetskrav-frontend";
export const BROWSER_APM_NAMESPACE = "team-esyfo";

const APP_CDN_PREFIX =
  "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/";
const UNKNOWN_RESOURCE_URL = `${BROWSER_BASE_PATH}/{resource}`;
const UUID =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
const KNOWN_RESOURCE_PATHS = new Set([
  `${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk`,
  `${BROWSER_BASE_PATH}/api/aktivitetsplikt/les`,
  `${BROWSER_BASE_PATH}/api/isAlive`,
  `${BROWSER_BASE_PATH}/api/isReady`,
  `${BROWSER_BASE_PATH}/api/logger`,
]);

const currentOrigin = (): string | undefined =>
  typeof location === "undefined" ? undefined : location.origin;

const parseUrl = (value: string): URL | undefined => {
  try {
    return new URL(value, currentOrigin());
  } catch {
    return undefined;
  }
};

const safeOrigin = (url: URL): string =>
  url.origin === currentOrigin() ? url.origin : "[url-origin]";

export function normalizePageUrl(value: string): string {
  const url = parseUrl(value);
  if (!url || url.username || url.password) return "[page-url]";
  return `${safeOrigin(url)}${pageIdFromBrowserPath(url.pathname)}`;
}

const normalizeResourceUrl = (value: string): string => {
  const url = parseUrl(value);
  if (!url || url.username || url.password) return "[resource-url]";

  const pageId = pageIdFromBrowserPath(url.pathname);
  const cleanPath = url.pathname.replace(/\/$/, "");
  const path =
    pageId !== UNKNOWN_PAGE_ID
      ? pageId
      : KNOWN_RESOURCE_PATHS.has(cleanPath)
        ? cleanPath
        : UNKNOWN_RESOURCE_URL;
  return `${safeOrigin(url)}${path}`;
};

export function normalizeStackFrameFilename(value: string): string {
  const url = parseUrl(value);
  if (
    !url ||
    url.username ||
    url.password ||
    url.hash ||
    !url.href.startsWith(APP_CDN_PREFIX)
  ) {
    return "[stack-frame]";
  }
  return `${url.origin}${url.pathname}`;
}

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const redactAppValues = (
  value: string,
  routeValues: string[],
  urlDetails: string[],
): string => {
  let result = value;
  for (const detail of urlDetails.filter(Boolean)) {
    result = result.replaceAll(detail, "[url-detail]");
  }
  for (const routeValue of routeValues.filter(Boolean)) {
    result = result.replace(
      new RegExp(
        `(?<![A-Za-z0-9_-])${escapeRegExp(routeValue)}(?![A-Za-z0-9_-])`,
        "g",
      ),
      "[route-id]",
    );
  }
  return result.replace(UUID, "[uuid]");
};

const mapStringValues = (
  value: unknown,
  transform: (value: string) => string,
): unknown => {
  if (typeof value === "string") return transform(value);
  if (Array.isArray(value)) {
    return value.map((entry) => mapStringValues(entry, transform));
  }
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      mapStringValues(entry, transform),
    ]),
  );
};

const sanitizePayload = <Payload>(
  payload: Payload,
  routeValues: string[],
  urlDetails: string[],
): Payload => {
  const scrubbed = mapStringValues(payload, (value) =>
    redactAppValues(value, routeValues, urlDetails),
  ) as Record<string, unknown>;

  const stacktrace = scrubbed.stacktrace as
    | { frames?: Array<Record<string, unknown>> }
    | undefined;
  if (stacktrace?.frames) {
    stacktrace.frames = stacktrace.frames.map((frame) => ({
      ...frame,
      ...(typeof frame.filename === "string"
        ? { filename: normalizeStackFrameFilename(frame.filename) }
        : {}),
    }));
  }

  if (
    (scrubbed.name === "faro.performance.navigation" ||
      scrubbed.name === "faro.performance.resource") &&
    typeof (scrubbed.attributes as Record<string, unknown> | undefined)
      ?.name === "string"
  ) {
    scrubbed.attributes = {
      ...(scrubbed.attributes as Record<string, unknown>),
      name: normalizeResourceUrl(
        (scrubbed.attributes as Record<string, string>).name,
      ),
    };
  }
  return scrubbed as Payload;
};

type BeforeSend = NonNullable<InitOptions["beforeSend"]>;

export const scrubBrowserTelemetry: BeforeSend = (item) => {
  const rawPageUrl = item.meta.page?.url;
  const pageUrl = rawPageUrl ? parseUrl(rawPageUrl) : undefined;
  const routeValues = pageUrl ? sensitiveRouteValues(pageUrl.pathname) : [];
  const urlDetails = [pageUrl?.search ?? "", pageUrl?.hash ?? ""];

  const meta = { ...item.meta };
  delete meta.user;
  if (meta.page && rawPageUrl) {
    meta.page = {
      ...meta.page,
      id: pageIdFromBrowserPath(pageUrl?.pathname ?? ""),
      url: normalizePageUrl(rawPageUrl),
    };
  }

  return {
    ...item,
    payload: sanitizePayload(item.payload, routeValues, urlDetails),
    meta,
  };
};

export const browserApmOptions = {
  app: BROWSER_APM_APP,
  namespace: BROWSER_APM_NAMESPACE,
  beforeSend: scrubBrowserTelemetry,
  faro: {
    pageTracking: {
      generatePageId: (currentLocation) =>
        pageIdFromBrowserPath(currentLocation.pathname),
    },
  },
  tracing: false,
  sessionReplay: { enabled: false },
  screenshotOnError: false,
} satisfies InitOptions;

export const isBrowserTelemetryEnvironment = (
  environment: string | undefined,
): boolean => environment === "dev" || environment === "prod";

export function initBrowserObservability() {
  if (
    typeof window === "undefined" ||
    !isBrowserTelemetryEnvironment(
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    ) ||
    isLocalHost(location.hostname)
  ) {
    return undefined;
  }
  return init(browserApmOptions);
}

export function trackBrowserRoute(toRoute: string, fromRoute?: string): void {
  if (!isInitialized()) return;
  pushEvent("route_change", {
    toRoute,
    toUrl: toRoute,
    ...(fromRoute ? { fromUrl: fromRoute } : {}),
  });
}
