import { describe, expect, it } from "vitest";
import {
  BROWSER_APM_APP,
  BROWSER_APM_NAMESPACE,
  BROWSER_BASE_PATH,
  browserApmOptions,
  normalizePageUrl,
  normalizeStackFrameFilename,
  pageIdFromBrowserPath,
  pageIdFromNextRoute,
  scrubBrowserTelemetry,
  UNKNOWN_PAGE_ID,
  UUID_PAGE_ID,
} from "./browser";
import { sensitiveRouteValues } from "./routes";

const routeId = "sak-med-fri-verdi-123";
const uuid = "0eda3772-1cab-482e-be5f-c18387cd8709";
const currentPageUrl = `${location.origin}${BROWSER_BASE_PATH}/${routeId}?canary=hemmelig#brev`;

describe("browser page identity", () => {
  it("normaliserer appens to sideruter", () => {
    expect(pageIdFromNextRoute("/")).toBe(BROWSER_BASE_PATH);
    expect(pageIdFromNextRoute("/[uuid]")).toBe(UUID_PAGE_ID);
    expect(pageIdFromBrowserPath(BROWSER_BASE_PATH)).toBe(BROWSER_BASE_PATH);
    expect(pageIdFromBrowserPath(`${BROWSER_BASE_PATH}/${routeId}`)).toBe(
      UUID_PAGE_ID,
    );
    expect(pageIdFromBrowserPath(`${BROWSER_BASE_PATH}/${routeId}/`)).toBe(
      UUID_PAGE_ID,
    );
  });

  it.each([
    "/",
    `/${routeId}`,
    `${BROWSER_BASE_PATH}/${routeId}/ekstra`,
    `${BROWSER_BASE_PATH}//${routeId}`,
  ])("lar ukjent fysisk rute feile lukket: %s", (path) => {
    expect(pageIdFromBrowserPath(path)).toBe(UNKNOWN_PAGE_ID);
  });

  it("behandler hele det dynamiske segmentet som sensitivt", () => {
    expect(sensitiveRouteValues(`${BROWSER_BASE_PATH}/fri%20verdi`)).toEqual([
      "fri%20verdi",
      "fri verdi",
    ]);
  });
});

describe("målrettet URL-normalisering", () => {
  it("fjerner credentials, query, fragment og dynamisk side-ID", () => {
    expect(normalizePageUrl(currentPageUrl)).toBe(
      `${location.origin}${UUID_PAGE_ID}`,
    );
    expect(
      normalizePageUrl(
        `https://bruker:pass@www.nav.no${BROWSER_BASE_PATH}/${routeId}`,
      ),
    ).toBe("[page-url]");
  });

  it("bevarer kjent CDN-fil for sourcemaps, men aldri URL-detaljer", () => {
    const filename =
      "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js?dpl=sha&token=hemmelig";

    expect(normalizeStackFrameFilename(filename)).toBe(
      "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js",
    );
  });

  it.each([
    "https://example.org/app.js?person=hemmelig",
    "https://bruker:pass@cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js",
    "webpack-internal:///src/person/hemmelig.ts",
  ])("skjuler ukjent eller ugyldig stack-frame: %s", (filename) => {
    expect(normalizeStackFrameFilename(filename)).toBe("[stack-frame]");
  });
});

describe("appens beforeSend-policy", () => {
  it("renser kun appspesifikke identifikatorer og lar nyttig diagnostikk stå", () => {
    const item = {
      type: "exception",
      payload: {
        type: "Error",
        value: `HTTP:500 på ${routeId}?canary=hemmelig#brev for ${uuid}; tid=1700000000000 org=975289753`,
        stacktrace: {
          frames: [
            {
              filename:
                "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js?dpl=sha",
              function: "render",
              lineno: 12,
              colno: 34,
            },
          ],
        },
      },
      meta: {
        page: { id: currentPageUrl, url: currentPageUrl },
        user: { id: "01017012345", email: "ola@nav.no" },
        session: {
          id: "short-lived-session",
          attributes: { isSampled: "true" },
        },
      },
    };

    const result = scrubBrowserTelemetry(item as never) as typeof item;
    const serialized = JSON.stringify(result);

    expect(result.meta.page).toEqual({
      id: UUID_PAGE_ID,
      url: `${location.origin}${UUID_PAGE_ID}`,
    });
    expect(result.meta.user).toBeUndefined();
    // Faro bruker isSampled i en etterfølgende hook og fjerner feltet før send.
    expect(result.meta.session).toEqual({
      id: "short-lived-session",
      attributes: { isSampled: "true" },
    });
    expect(result.payload.stacktrace.frames[0]).toEqual({
      filename:
        "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js",
      function: "render",
      lineno: 12,
      colno: 34,
    });
    expect(serialized).not.toContain(routeId);
    expect(serialized).not.toContain(uuid);
    expect(serialized).not.toContain("canary=hemmelig");
    expect(serialized).not.toContain("#brev");
    expect(serialized).toContain("HTTP:500");
    expect(serialized).toContain("1700000000000");
    expect(serialized).toContain("975289753");
  });

  it("maskerer en kort rute-ID uten å ødelegge andre tall", () => {
    const result = scrubBrowserTelemetry({
      type: "exception",
      payload: { value: "sak=123 kode=12345 tid=1700000000000" },
      meta: {
        page: {
          url: `${location.origin}${BROWSER_BASE_PATH}/123`,
        },
      },
    } as never) as { payload: { value: string } };

    expect(result.payload.value).toBe(
      "sak=[route-id] kode=12345 tid=1700000000000",
    );
  });

  it("normaliserer Faro navigation- og resource-URL-er", () => {
    for (const [name, resourceUrl, expected] of [
      [
        "faro.performance.navigation",
        currentPageUrl,
        `${location.origin}${UUID_PAGE_ID}`,
      ],
      [
        "faro.performance.resource",
        `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk?fnr=hemmelig`,
        `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk`,
      ],
    ]) {
      const result = scrubBrowserTelemetry({
        type: "event",
        payload: { name, attributes: { name: resourceUrl } },
        meta: { page: { url: currentPageUrl } },
      } as never) as { payload: { attributes: { name: string } } };

      expect(result.payload.attributes.name).toBe(expected);
    }
  });
});

describe("APM-konfigurasjon", () => {
  it("lar @nais/apm eie standardene og beholder eksplisitte privacy-valg", () => {
    expect(browserApmOptions).toMatchObject({
      app: BROWSER_APM_APP,
      namespace: BROWSER_APM_NAMESPACE,
      tracing: false,
      sessionReplay: { enabled: false },
      screenshotOnError: false,
      faro: { pageTracking: { generatePageId: expect.any(Function) } },
    });
    expect(browserApmOptions).not.toHaveProperty("version");
    expect(browserApmOptions).not.toHaveProperty("environment");
    expect(browserApmOptions).not.toHaveProperty("telemetryUrl");
  });
});
