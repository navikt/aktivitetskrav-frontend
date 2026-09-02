import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { init } = vi.hoisted(() => ({ init: vi.fn() }));

vi.mock("@nais/apm", () => ({ init }));

describe("browser reporting", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    init.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it.each([
    "dev",
    "demo",
    "prod",
  ])("initialiserer i %s", async (environment) => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);
    const { browserApmOptions, initBrowserObservability } = await import(
      "./browser"
    );

    initBrowserObservability();

    expect(init).toHaveBeenCalledOnce();
    expect(init).toHaveBeenCalledWith(browserApmOptions);
  });

  it.each([
    "local",
    "test",
    "ukjent",
  ])("initialiserer ikke i %s", async (environment) => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", environment);
    const { initBrowserObservability } = await import("./browser");

    initBrowserObservability();

    expect(init).not.toHaveBeenCalled();
  });

  it("lar @nais/apm håndtere localhost i et aktivt miljø", async () => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", "dev");
    expect(location.hostname).toBe("localhost");
    const { initBrowserObservability } = await import("./browser");

    initBrowserObservability();

    expect(init).toHaveBeenCalledOnce();
  });

  it("initialiserer ikke på server", async () => {
    vi.stubEnv("NEXT_PUBLIC_RUNTIME_ENVIRONMENT", "dev");
    vi.stubGlobal("window", undefined);
    const { initBrowserObservability } = await import("./browser");

    initBrowserObservability();

    expect(init).not.toHaveBeenCalled();
  });
});
