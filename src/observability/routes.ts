export const BROWSER_BASE_PATH = "/syk/aktivitetskrav";
export const UUID_PAGE_ID = `${BROWSER_BASE_PATH}/{uuid}`;
export const UNKNOWN_PAGE_ID = `${BROWSER_BASE_PATH}/{unknown}`;

const pathOnly = (pathname: string): string =>
  pathname.split(/[?#]/, 1)[0] || "/";

export function pageIdFromBrowserPath(pathname: string): string {
  const path = pathOnly(pathname);
  if (path === BROWSER_BASE_PATH || path === `${BROWSER_BASE_PATH}/`) {
    return BROWSER_BASE_PATH;
  }
  if (path.startsWith(`${BROWSER_BASE_PATH}/`)) {
    const remainder = path
      .slice(BROWSER_BASE_PATH.length + 1)
      .replace(/\/$/, "");
    if (remainder !== "" && !remainder.includes("/")) return UUID_PAGE_ID;
  }
  return UNKNOWN_PAGE_ID;
}
