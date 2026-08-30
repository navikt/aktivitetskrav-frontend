import {
  type InitOptions,
  init,
  isInitialized,
  pushEvent,
  scrubString,
} from "@nais/apm";
import { resolveApmEnvironment } from "./environment";
import {
  normalizeTelemetryPath,
  pageIdFromBrowserPath,
  sensitiveValuesFromBrowserPath,
} from "./routes";

export {
  BROWSER_BASE_PATH,
  normalizeTelemetryPath,
  pageIdFromBrowserPath,
  pageIdFromNextRoute,
  UNKNOWN_PAGE_ID,
  UNKNOWN_RESOURCE_PATH,
} from "./routes";

export const BROWSER_APM_APP = "aktivitetskrav-frontend";
export const BROWSER_APM_NAMESPACE = "team-esyfo";
export const BROWSER_SESSION_SAMPLING_RATE = 1;

const UUID =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
const ORGANIZATION_NUMBER = /\b\d{9}\b/g;
const ACTOR_ID = /\b\d{13}\b/g;
const NAV_IDENT = /\b[A-Z]\d{6}\b/gi;
const SCHEME_URL = /\b[A-Za-z][A-Za-z0-9+.-]*:[^\s"'<>]+/g;
const RELATIVE_URL = /(^|[\s("'=])((?:\/\/|\/(?!\/))[^\s"'<>]+)/gi;
const URL_DETAIL = /(^|[\s("'=])([?#][^\s"'<>]+)/g;
const TRAILING_PUNCTUATION = /[),.;!?]+$/;
const NEXT_CHUNK_WITH_POSITION = /^(.*\.js(?:\?[^#\s]*?)?)(:\d+:\d+)?$/i;
const NEXT_CHUNK_PATH =
  /^\/(?:(?:syk\/aktivitetskrav|team-esyfo\/aktivitetskrav-frontend)\/)?_next\/static\/chunks\/(?:(?:[a-z0-9._[\]-]|%5b|%5d)+\/)*(?:[a-z0-9._[\]-]|%5b|%5d)+\.js$/i;
const MAX_SCRUB_DEPTH = 10;

const sensitiveValuesFromCurrentRoute = (): string[] =>
  typeof location === "undefined"
    ? []
    : sensitiveValuesFromBrowserPath(location.pathname);

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const redactSensitiveValues = (
  value: string,
  sensitiveValues: readonly string[],
): string =>
  sensitiveValues.reduce(
    (result, sensitiveValue) =>
      result.replace(
        new RegExp(
          `(?<![A-Za-z0-9_-])${escapeRegExp(sensitiveValue)}(?![A-Za-z0-9_-])`,
          "g",
        ),
        "[route-id]",
      ),
    value,
  );

const withoutTrailingPunctuation = (
  value: string,
): { url: string; suffix: string } => {
  const suffix = value.match(TRAILING_PUNCTUATION)?.[0] ?? "";
  return { url: suffix ? value.slice(0, -suffix.length) : value, suffix };
};

const observedScriptUrls = (): Set<string> => {
  const values =
    typeof document === "undefined"
      ? []
      : Array.from(document.scripts, (script) => script.src).filter(Boolean);
  if (
    typeof performance !== "undefined" &&
    typeof performance.getEntriesByType === "function"
  ) {
    values.push(
      ...performance
        .getEntriesByType("resource")
        .filter(
          (entry): entry is PerformanceResourceTiming =>
            "initiatorType" in entry && entry.initiatorType === "script",
        )
        .map((entry) => entry.name),
    );
  }

  const urls = new Set<string>();
  for (const value of values) {
    try {
      urls.add(new URL(value, location.href).href);
    } catch {
      // A malformed resource entry must not disable telemetry scrubbing.
    }
  }
  return urls;
};

const trustedNextChunk = (value: string): string | null => {
  const match = value.match(NEXT_CHUNK_WITH_POSITION);
  const resourceUrl = match?.[1];
  if (!resourceUrl || typeof location === "undefined") return null;

  try {
    const url = new URL(resourceUrl, location.href);
    if (url.username || url.password || url.hash) return null;
    if (!NEXT_CHUNK_PATH.test(url.pathname)) return null;

    const query = Array.from(url.searchParams.entries());
    const expectedDeploymentId = process.env.NEXT_PUBLIC_VERSION;
    const allowedQuery =
      query.length === 0 ||
      (query.length === 1 &&
        query[0][0] === "dpl" &&
        expectedDeploymentId !== undefined &&
        query[0][1] === expectedDeploymentId);
    if (!allowedQuery) return null;

    const configuredAssetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;
    const assetPrefix = configuredAssetPrefix
      ? new URL(configuredAssetPrefix, location.href)
      : undefined;
    const prefixPath = assetPrefix?.pathname.replace(/\/$/, "");
    const allowedOrigin =
      url.origin === location.origin ||
      (assetPrefix !== undefined &&
        url.origin === assetPrefix.origin &&
        url.pathname.startsWith(`${prefixPath}/_next/static/chunks/`));
    if (!allowedOrigin || !observedScriptUrls().has(url.href)) return null;

    const prefix =
      resourceUrl.startsWith("/") && !resourceUrl.startsWith("//")
        ? ""
        : url.origin;
    return `${prefix}${url.pathname}${match[2] ?? ""}`;
  } catch {
    return null;
  }
};

const sanitizeUrl = (value: string): string => {
  const { url: candidate, suffix } = withoutTrailingPunctuation(value);
  const chunk = trustedNextChunk(candidate);
  if (chunk) return `${chunk}${suffix}`;

  try {
    const protocolRelative = candidate.startsWith("//");
    const url = new URL(protocolRelative ? `https:${candidate}` : candidate);
    if (!["http:", "https:", "ws:", "wss:"].includes(url.protocol)) {
      return `[url]${suffix}`;
    }
    const sameOrigin =
      typeof location !== "undefined" &&
      (protocolRelative
        ? url.host === location.host
        : url.origin === location.origin);
    const prefix = sameOrigin
      ? protocolRelative
        ? `//${url.host}`
        : url.origin
      : "[url-origin]";
    return `${prefix}${normalizeTelemetryPath(url.pathname)}${suffix}`;
  } catch {
    return `[url]${suffix}`;
  }
};

const sanitizeRelativeUrl = (value: string): string => {
  const { url, suffix } = withoutTrailingPunctuation(value);
  if (url.startsWith("//")) return `${sanitizeUrl(url)}${suffix}`;
  const chunk = trustedNextChunk(url);
  return `${chunk ?? normalizeTelemetryPath(url)}${suffix}`;
};

export function scrubTelemetryString(
  value: string,
  sensitiveValues: readonly string[] = sensitiveValuesFromCurrentRoute(),
): string {
  let marker = "\u{e000}";
  while (value.includes(marker)) marker += "\u{e001}";
  const protectedValues: string[] = [];
  const protect = (sanitized: string): string => {
    const token = `${marker}${protectedValues.length}${marker}`;
    protectedValues.push(sanitized);
    return token;
  };

  let scrubbed = redactSensitiveValues(value, sensitiveValues);
  scrubbed = scrubbed.replace(SCHEME_URL, (url) => protect(sanitizeUrl(url)));
  scrubbed = scrubbed.replace(
    RELATIVE_URL,
    (_, prefix: string, url: string) =>
      `${prefix}${protect(sanitizeRelativeUrl(url))}`,
  );
  scrubbed = scrubbed.replace(
    URL_DETAIL,
    (_, prefix: string) => `${prefix}[url-detail]`,
  );
  protectedValues.forEach((sanitized, index) => {
    scrubbed = scrubbed.replaceAll(`${marker}${index}${marker}`, sanitized);
  });

  return scrubString(
    scrubbed
      .replace(UUID, "[uuid]")
      .replace(ACTOR_ID, "[aktor-id]")
      .replace(ORGANIZATION_NUMBER, "[orgnr]")
      .replace(NAV_IDENT, "[nav-ident]"),
  );
}

const scrubTelemetryValue = (
  value: unknown,
  sensitiveValues: readonly string[],
  depth = 0,
  seen = new WeakSet<object>(),
): unknown => {
  if (typeof value === "string") {
    return scrubTelemetryString(value, sensitiveValues);
  }
  if (value === null || typeof value !== "object") return value;
  if (depth >= MAX_SCRUB_DEPTH) return "[truncated]";
  if (seen.has(value)) return "[circular]";
  seen.add(value);

  if (Array.isArray(value)) {
    return value.map((item) =>
      scrubTelemetryValue(item, sensitiveValues, depth + 1, seen),
    );
  }

  const copy: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    copy[scrubTelemetryString(key, sensitiveValues)] = scrubTelemetryValue(
      item,
      sensitiveValues,
      depth + 1,
      seen,
    );
  }
  return copy;
};

type BeforeSend = NonNullable<InitOptions["beforeSend"]>;

export const scrubBrowserTelemetry: BeforeSend = (item) => {
  const scrubbed = scrubTelemetryValue(
    item,
    sensitiveValuesFromCurrentRoute(),
  ) as typeof item;
  if (scrubbed.meta?.user) {
    const meta = { ...scrubbed.meta };
    delete meta.user;
    return { ...scrubbed, meta };
  }
  return scrubbed;
};

export const browserApmOptions = {
  app: BROWSER_APM_APP,
  namespace: BROWSER_APM_NAMESPACE,
  version: process.env.NEXT_PUBLIC_VERSION,
  environment: resolveApmEnvironment(
    undefined,
    process.env.NEXT_PUBLIC_NAIS_CLUSTER_NAME,
  ),
  telemetryUrl: process.env.NEXT_PUBLIC_TELEMETRY_URL,
  beforeSend: scrubBrowserTelemetry,
  dangerouslyDisablePiiScrubbing: false,
  faro: {
    pageTracking: {
      generatePageId: (currentLocation) =>
        pageIdFromBrowserPath(currentLocation.pathname),
    },
    sessionTracking: {
      samplingRate: BROWSER_SESSION_SAMPLING_RATE,
    },
    trackGeolocation: false,
  },
  tracing: false,
  sessionReplay: { enabled: false },
  screenshotOnError: false,
  devConsoleEcho: false,
} satisfies InitOptions;

const isLocalBrowser = (): boolean =>
  typeof location !== "undefined" &&
  (location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "[::1]" ||
    location.hostname.endsWith(".localhost") ||
    location.hostname.endsWith(".local"));

export const isBrowserTelemetryEnvironment = (
  environment: string | undefined,
): boolean => environment === "dev" || environment === "prod";

export function initBrowserObservability() {
  if (
    typeof window === "undefined" ||
    !isBrowserTelemetryEnvironment(
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    ) ||
    isLocalBrowser()
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
