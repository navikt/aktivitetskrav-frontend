import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApmRouteTracker } from "./ApmRouteTracker";

const state = vi.hoisted(() => ({ pathname: "/" }));
const { trackBrowserRoute } = vi.hoisted(() => ({
  trackBrowserRoute: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: () => ({ pathname: state.pathname }),
}));

vi.mock("./browser", () => ({
  pageIdFromNextRoute: (pathname: string) =>
    pathname === "/[uuid]"
      ? "/syk/aktivitetskrav/{uuid}"
      : "/syk/aktivitetskrav",
  trackBrowserRoute,
}));

describe("ApmRouteTracker", () => {
  beforeEach(() => {
    state.pathname = "/";
    trackBrowserRoute.mockClear();
  });

  it("sender én hendelse per logiske siderute", () => {
    const view = render(<ApmRouteTracker />);

    expect(trackBrowserRoute).toHaveBeenLastCalledWith(
      "/syk/aktivitetskrav",
      undefined,
    );

    view.rerender(<ApmRouteTracker />);
    expect(trackBrowserRoute).toHaveBeenCalledTimes(1);

    state.pathname = "/[uuid]";
    view.rerender(<ApmRouteTracker />);
    expect(trackBrowserRoute).toHaveBeenLastCalledWith(
      "/syk/aktivitetskrav/{uuid}",
      "/syk/aktivitetskrav",
    );
    expect(trackBrowserRoute).toHaveBeenCalledTimes(2);
  });
});
