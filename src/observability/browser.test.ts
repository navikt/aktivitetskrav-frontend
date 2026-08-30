import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BROWSER_APM_APP,
  BROWSER_APM_NAMESPACE,
  BROWSER_BASE_PATH,
  BROWSER_SESSION_SAMPLING_RATE,
  browserApmOptions,
  isBrowserTelemetryEnvironment,
  normalizeTelemetryPath,
  pageIdFromBrowserPath,
  pageIdFromNextRoute,
  scrubBrowserTelemetry,
  scrubTelemetryString,
  UNKNOWN_PAGE_ID,
  UNKNOWN_RESOURCE_PATH,
} from "./browser";

const routeId = "sak-med-fri-verdi-123";
const uuid = "0eda3772-1cab-482e-be5f-c18387cd8709";

describe("browser page identity", () => {
  it("normaliserer de to kjente siderutene", () => {
    expect(pageIdFromNextRoute("/")).toBe(BROWSER_BASE_PATH);
    expect(pageIdFromNextRoute("/[uuid]")).toBe(`${BROWSER_BASE_PATH}/{uuid}`);
    expect(pageIdFromBrowserPath(BROWSER_BASE_PATH)).toBe(BROWSER_BASE_PATH);
    expect(
      pageIdFromBrowserPath(
        `${BROWSER_BASE_PATH}/${routeId}?fnr=01017012345#brev`,
      ),
    ).toBe(`${BROWSER_BASE_PATH}/{uuid}`);
  });

  it.each([
    "/",
    `/${routeId}`,
    `${BROWSER_BASE_PATH}/${routeId}/ekstra`,
    `${BROWSER_BASE_PATH}//${routeId}`,
    `${BROWSER_BASE_PATH}/${routeId}/../annen`,
  ])("lar ukjent fysisk rute feile lukket: %s", (path) => {
    expect(pageIdFromBrowserPath(path)).toBe(UNKNOWN_PAGE_ID);
  });

  it("lar ukjent Next-rute feile lukket", () => {
    expect(pageIdFromNextRoute("/ny/[id]")).toBe(UNKNOWN_PAGE_ID);
  });
});

describe("telemetry resources", () => {
  it.each([
    [
      "/api/aktivitetsplikt/historikk",
      `${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk`,
    ],
    [
      "/api/aktivitetsplikt/les",
      `${BROWSER_BASE_PATH}/api/aktivitetsplikt/les`,
    ],
    ["/api/isAlive", `${BROWSER_BASE_PATH}/api/isAlive`],
    ["/api/isReady", `${BROWSER_BASE_PATH}/api/isReady`],
    ["/api/logger", `${BROWSER_BASE_PATH}/api/logger`],
  ])("normaliserer %s", (path, expected) => {
    expect(normalizeTelemetryPath(`${BROWSER_BASE_PATH}${path}`)).toBe(
      expected,
    );
  });

  it("skjuler ukjente ressurser og eksterne ensegmentsruter", () => {
    expect(normalizeTelemetryPath("/sak/ola-nordmann")).toBe(
      UNKNOWN_RESOURCE_PATH,
    );
    expect(normalizeTelemetryPath("/hemmelig-slug")).toBe(
      UNKNOWN_RESOURCE_PATH,
    );
  });
});

describe("privacy scrub", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_VERSION", "deploy-sha-123");
    vi.stubEnv(
      "NEXT_PUBLIC_ASSET_PREFIX",
      "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend",
    );
  });

  afterEach(() => {
    document.querySelectorAll("script[data-test-chunk]").forEach((script) => {
      script.remove();
    });
    history.replaceState({}, "", "/");
    vi.unstubAllEnvs();
  });

  it("fjerner dynamisk ruteverdi, credentials, query og fragment", () => {
    const value = scrubTelemetryString(
      `Fetch https://bruker:pass@www.nav.no${BROWSER_BASE_PATH}/${routeId}?fnr=01017012345#brev failed for ${uuid}`,
      [routeId],
    );

    expect(value).toBe(
      `Fetch [url-origin]${BROWSER_BASE_PATH}/{uuid} failed for [uuid]`,
    );
  });

  it("beholder observert CDN-chunk med forventet deploy-ID, uten query", () => {
    const path =
      "/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/pages/%5Buuid%5D-abc123.js";
    const url = `https://cdn.nav.no${path}?dpl=deploy-sha-123`;
    const script = document.createElement("script");
    script.dataset.testChunk = "true";
    script.src = url;
    document.head.append(script);

    expect(scrubTelemetryString(`${url}:12:34`)).toBe(
      `https://cdn.nav.no${path}:12:34`,
    );
  });

  it("avviser ukjent chunk, ekstra query og credentials", () => {
    const path =
      "/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/not-loaded.js";
    for (const url of [
      `https://cdn.nav.no${path}?dpl=deploy-sha-123&token=hemmelig`,
      `https://bruker:pass@cdn.nav.no${path}?dpl=deploy-sha-123`,
      `https://cdn.nav.no${path}?dpl=feil-deploy-sha`,
    ]) {
      const script = document.createElement("script");
      script.dataset.testChunk = "true";
      script.src = url;
      document.head.append(script);
      const scrubbed = scrubTelemetryString(`${url}:1:2`);
      expect(scrubbed).toBe(`[url-origin]${BROWSER_BASE_PATH}/_next/{asset}`);
      expect(scrubbed).not.toContain("hemmelig");
      expect(scrubbed).not.toContain("bruker:pass");
      expect(scrubbed).not.toContain("deploy-sha-123");
      expect(scrubbed).not.toContain("feil-deploy-sha");
    }

    expect(
      scrubTelemetryString(
        `${location.origin}${BROWSER_BASE_PATH}/_next/static/chunks/not-loaded.js:1:2`,
      ),
    ).toBe(`${location.origin}${BROWSER_BASE_PATH}/_next/{asset}`);
  });

  it.each([
    [
      "https://ola-nordmann.example/sak/fritekst?hemmelig=verdi",
      `[url-origin]${UNKNOWN_RESOURCE_PATH}`,
    ],
    [
      "//ola-nordmann.example/sak/fritekst?hemmelig=verdi",
      `[url-origin]${UNKNOWN_RESOURCE_PATH}`,
    ],
    ["ftp://bruker:pass@kundeslug.example/sak/fritekst?hemmelig", "[url]"],
    ["webpack-internal:///sak/fritekst?hemmelig", "[url]"],
    ["chrome-extension://personverdi/sak/fritekst?hemmelig", "[url]"],
  ])("skjuler ukjent URL-origin, scheme og detaljer: %s", (url, expected) => {
    const scrubbed = scrubTelemetryString(url);

    expect(scrubbed).toBe(expected);
    expect(scrubbed).not.toContain("ola-nordmann");
    expect(scrubbed).not.toContain("kundeslug");
    expect(scrubbed).not.toContain("bruker:pass");
    expect(scrubbed).not.toContain("fritekst");
    expect(scrubbed).not.toContain("hemmelig");
  });

  it("renser alle strenger og nøkler rekursivt uten å endre input", () => {
    history.replaceState(
      {},
      "",
      `${BROWSER_BASE_PATH}/${routeId}?fnr=01017012345#brev`,
    );
    const actorId = "1234567890123";
    const navIdent = "Z994488";
    const cyclic: Record<string, unknown> = { value: uuid };
    cyclic.self = cyclic;
    const item = {
      type: "exception",
      payload: {
        type: "Error",
        value: `GET ${BROWSER_BASE_PATH}/${routeId}?org=975289753 failed`,
        [routeId]: {
          stack: `at https://bruker:pass@www.nav.no${BROWSER_BASE_PATH}/${routeId}?token=hemmelig#brev:1:2`,
          uuid,
          actorId,
          navIdent,
          cyclic,
        },
      },
      meta: {
        page: {
          id: `${BROWSER_BASE_PATH}/${routeId}`,
          url: `https://www.nav.no${BROWSER_BASE_PATH}/${routeId}?fnr=01017012345#brev`,
        },
        user: { id: "01017012345", email: "ola@nav.no" },
      },
    };

    const result = scrubBrowserTelemetry(item as never) as typeof item;
    const serialized = JSON.stringify(result);

    for (const secret of [
      routeId,
      uuid,
      actorId,
      navIdent,
      "01017012345",
      "975289753",
      "hemmelig",
      "ola@nav.no",
      "bruker:pass",
    ]) {
      expect(serialized).not.toContain(secret);
    }
    expect(result.meta.user).toBeUndefined();
    expect(result.meta.page.id).toBe(`${BROWSER_BASE_PATH}/{uuid}`);
    expect(item.meta.user.id).toBe("01017012345");
    expect(cyclic.self).toBe(cyclic);
    expect(serialized).toContain("[aktor-id]");
    expect(serialized).toContain("[nav-ident]");
  });
});

describe("APM configuration", () => {
  it("har eksplisitt identitet, sampling og privacy-defaults", () => {
    expect(browserApmOptions).toMatchObject({
      app: BROWSER_APM_APP,
      namespace: BROWSER_APM_NAMESPACE,
      version: process.env.NEXT_PUBLIC_VERSION,
      environment: process.env.NEXT_PUBLIC_NAIS_CLUSTER_NAME,
      dangerouslyDisablePiiScrubbing: false,
      tracing: false,
      sessionReplay: { enabled: false },
      screenshotOnError: false,
      faro: {
        sessionTracking: { samplingRate: BROWSER_SESSION_SAMPLING_RATE },
        trackGeolocation: false,
      },
    });
    expect(BROWSER_SESSION_SAMPLING_RATE).toBeGreaterThan(0);
    expect(BROWSER_SESSION_SAMPLING_RATE).toBeLessThanOrEqual(1);
    expect(browserApmOptions.faro).not.toHaveProperty("user");
  });

  it("aktiverer bare telemetry i dev og prod", () => {
    expect(isBrowserTelemetryEnvironment("dev")).toBe(true);
    expect(isBrowserTelemetryEnvironment("prod")).toBe(true);
    expect(isBrowserTelemetryEnvironment("demo")).toBe(false);
    expect(isBrowserTelemetryEnvironment("local")).toBe(false);
    expect(isBrowserTelemetryEnvironment("test")).toBe(false);
    expect(isBrowserTelemetryEnvironment(undefined)).toBe(false);
    expect(isBrowserTelemetryEnvironment("ukjent")).toBe(false);
  });
});
