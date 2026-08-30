export const BROWSER_BASE_PATH = "/syk/aktivitetskrav";
export const UNKNOWN_PAGE_ID = `${BROWSER_BASE_PATH}/{unknown}`;
export const UNKNOWN_RESOURCE_PATH = `${BROWSER_BASE_PATH}/{unknown-resource}`;

const pageIdsByNextRoute = {
  "/": BROWSER_BASE_PATH,
  "/[uuid]": `${BROWSER_BASE_PATH}/{uuid}`,
} as const;

const apiRoutes: ReadonlyArray<readonly [RegExp, string]> = [
  [
    /^\/api\/aktivitetsplikt\/historikk\/?$/,
    `${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk`,
  ],
  [
    /^\/api\/aktivitetsplikt\/les\/?$/,
    `${BROWSER_BASE_PATH}/api/aktivitetsplikt/les`,
  ],
  [/^\/api\/isAlive\/?$/, `${BROWSER_BASE_PATH}/api/isAlive`],
  [/^\/api\/isReady\/?$/, `${BROWSER_BASE_PATH}/api/isReady`],
  [/^\/api\/logger\/?$/, `${BROWSER_BASE_PATH}/api/logger`],
];

export const withoutBasePath = (pathname: string): string => {
  if (pathname === BROWSER_BASE_PATH) return "/";
  return pathname.startsWith(`${BROWSER_BASE_PATH}/`)
    ? pathname.slice(BROWSER_BASE_PATH.length)
    : pathname;
};

export function pageIdFromNextRoute(pathname: string): string {
  return (
    pageIdsByNextRoute[pathname as keyof typeof pageIdsByNextRoute] ??
    UNKNOWN_PAGE_ID
  );
}

export function pageIdFromBrowserPath(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  if (path === BROWSER_BASE_PATH || path === `${BROWSER_BASE_PATH}/`) {
    return BROWSER_BASE_PATH;
  }
  if (new RegExp(`^${BROWSER_BASE_PATH}/[^/]+/?$`).test(path)) {
    return pageIdsByNextRoute["/[uuid]"];
  }
  return UNKNOWN_PAGE_ID;
}

export function normalizeTelemetryPath(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  const hasBasePath =
    path === BROWSER_BASE_PATH || path.startsWith(`${BROWSER_BASE_PATH}/`);
  const relativePath = withoutBasePath(path);

  if (hasBasePath && relativePath === "/") return BROWSER_BASE_PATH;
  if (hasBasePath && /^\/[^/]+\/?$/.test(relativePath)) {
    return pageIdsByNextRoute["/[uuid]"];
  }

  const apiRoute = apiRoutes.find(([pattern]) => pattern.test(relativePath));
  if (apiRoute) return apiRoute[1];

  if (/\/_next(?:\/.*)?$/i.test(path)) {
    return `${BROWSER_BASE_PATH}/_next/{asset}`;
  }
  return UNKNOWN_RESOURCE_PATH;
}

export function sensitiveValuesFromBrowserPath(pathname: string): string[] {
  if (pageIdFromBrowserPath(pathname) !== pageIdsByNextRoute["/[uuid]"]) {
    return [];
  }

  const value = withoutBasePath(pathname.split(/[?#]/, 1)[0])
    .split("/")
    .filter(Boolean)[0];
  if (!value) return [];

  try {
    const decoded = decodeURIComponent(value);
    return decoded === value ? [value] : [value, decoded];
  } catch {
    return [value];
  }
}
