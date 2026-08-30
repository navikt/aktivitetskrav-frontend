import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { pageIdFromNextRoute, trackBrowserRoute } from "./browser";

export const ApmRouteTracker = () => {
  const { pathname } = useRouter();
  const pageId = pageIdFromNextRoute(pathname);
  const previousPageId = useRef<string>(undefined);

  useEffect(() => {
    if (previousPageId.current === pageId) return;
    trackBrowserRoute(pageId, previousPageId.current);
    previousPageId.current = pageId;
  }, [pageId]);

  return null;
};
