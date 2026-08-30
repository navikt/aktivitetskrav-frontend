import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { init, isInitialized, pushEvent } = vi.hoisted(() => ({
  init: vi.fn(),
  isInitialized: vi.fn(() => true),
  pushEvent: vi.fn(),
}));

vi.mock("@nais/apm", () => ({
  init,
  isLocalHost: (hostname: string) => hostname === "localhost",
  isInitialized,
  pushEvent,
}));

describe("browser reporting", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    init.mockClear();
    isInitialized.mockReset();
    isInitialized.mockReturnValue(true);
    pushEvent.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("initialiserer i dev på en ikke-lokal host", async () => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", "dev");
    vi.stubGlobal("location", {
      hostname: "www.ekstern.dev.nav.no",
      href: "https://www.ekstern.dev.nav.no/syk/aktivitetskrav",
      origin: "https://www.ekstern.dev.nav.no",
      pathname: "/syk/aktivitetskrav",
    });
    const { browserApmOptions, initBrowserObservability } = await import(
      "./browser"
    );

    initBrowserObservability();

    expect(init).toHaveBeenCalledOnce();
    expect(init).toHaveBeenCalledWith(browserApmOptions);
  });

  it.each([
    "demo",
    "local",
    "test",
    "ukjent",
  ])("initialiserer ikke i %s", async (environment) => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);
    vi.stubGlobal("location", {
      hostname: "demo.ekstern.dev.nav.no",
      href: "https://demo.ekstern.dev.nav.no/syk/aktivitetskrav",
      origin: "https://demo.ekstern.dev.nav.no",
      pathname: "/syk/aktivitetskrav",
    });
    const { initBrowserObservability } = await import("./browser");

    initBrowserObservability();

    expect(init).not.toHaveBeenCalled();
  });

  it("initialiserer ikke dev-telemetry på localhost", async () => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", "dev");
    const { initBrowserObservability } = await import("./browser");

    expect(location.hostname).toBe("localhost");
    initBrowserObservability();

    expect(init).not.toHaveBeenCalled();
  });

  it("sender bare den normaliserte ruten etter initialisering", async () => {
    const { trackBrowserRoute } = await import("./browser");

    trackBrowserRoute("/syk/aktivitetskrav/{uuid}", "/syk/aktivitetskrav");

    expect(pushEvent).toHaveBeenCalledWith("route_change", {
      toRoute: "/syk/aktivitetskrav/{uuid}",
      toUrl: "/syk/aktivitetskrav/{uuid}",
      fromUrl: "/syk/aktivitetskrav",
    });

    isInitialized.mockReturnValue(false);
    trackBrowserRoute("/syk/aktivitetskrav/{uuid}");
    expect(pushEvent).toHaveBeenCalledOnce();
  });
});
