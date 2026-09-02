import { describe, expect, it } from "vitest";
import {
  BROWSER_APM_APP,
  BROWSER_APM_NAMESPACE,
  BROWSER_BASE_PATH,
  browserApmOptions,
  normalizeBrowserTelemetry,
  normalizePageUrl,
  normalizeTelemetryUrl,
  pageIdFromBrowserPath,
  UNKNOWN_PAGE_ID,
  UUID_PAGE_ID,
} from "./browser";

const routeId = "sak-med-fri-verdi-123";
const currentPageUrl = `${location.origin}${BROWSER_BASE_PATH}/${routeId}?canary=hemmelig#brev`;

describe("browser page identity", () => {
  it("normaliserer appens sideruter", () => {
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
});

describe("målrettet URL-normalisering", () => {
  it("fjerner query, fragment og dynamisk side-ID fra page URL", () => {
    expect(normalizePageUrl(currentPageUrl)).toBe(
      `${location.origin}${UUID_PAGE_ID}`,
    );
    expect(
      normalizePageUrl(
        `https://bruker:pass@www.nav.no${BROWSER_BASE_PATH}/${routeId}`,
      ),
    ).toBe("[page-url]");
  });

  it("beholder diagnostisk resource- og stackinformasjon uten URL-detaljer", () => {
    expect(
      normalizeTelemetryUrl(
        `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk?fnr=hemmelig#svar`,
      ),
    ).toBe(
      `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/historikk`,
    );
    expect(
      normalizeTelemetryUrl(
        "https://cdn.nav.no/aksel/font.woff2?deploy=sha#font",
      ),
    ).toBe("https://cdn.nav.no/aksel/font.woff2");
    expect(
      normalizeTelemetryUrl(
        "webpack-internal:///src/pages/[uuid]/index.tsx?line=30#render",
      ),
    ).toBe("webpack-internal:///src/pages/[uuid]/index.tsx");
  });

  it("normaliserer dynamiske app-URL-er i payloaden", () => {
    expect(normalizeTelemetryUrl(currentPageUrl)).toBe(
      `${location.origin}${UUID_PAGE_ID}`,
    );
  });
});

describe("appens beforeSend-policy", () => {
  it("endrer bare kjente URL-felt og lar APM eie resten", () => {
    const payloadValue =
      "HTTP:500 for 01017012345, ola@nav.no og sak-med-fri-verdi-123";
    const item = {
      type: "exception",
      payload: {
        type: "Error",
        value: payloadValue,
        stacktrace: {
          frames: [
            {
              filename:
                "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js?dpl=sha#render",
              function: "render",
              lineno: 12,
              colno: 34,
            },
          ],
        },
      },
      meta: {
        page: { id: currentPageUrl, url: currentPageUrl },
        user: { id: "opaque-correlation-key" },
        session: {
          id: "short-lived-session",
          attributes: { platformAttribute: "beholdes" },
        },
      },
    };

    const result = normalizeBrowserTelemetry(item as never) as typeof item;

    expect(result.meta.page).toEqual({
      id: UUID_PAGE_ID,
      url: `${location.origin}${UUID_PAGE_ID}`,
    });
    expect(result.meta.user).toEqual(item.meta.user);
    expect(result.meta.session).toEqual(item.meta.session);
    expect(result.payload.value).toBe(payloadValue);
    expect(result.payload.stacktrace.frames[0]).toEqual({
      filename:
        "https://cdn.nav.no/team-esyfo/aktivitetskrav-frontend/_next/static/chunks/app.js",
      function: "render",
      lineno: 12,
      colno: 34,
    });
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
        `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/les?fnr=hemmelig`,
        `${location.origin}${BROWSER_BASE_PATH}/api/aktivitetsplikt/les`,
      ],
    ]) {
      const result = normalizeBrowserTelemetry({
        type: "event",
        payload: { name, attributes: { name: resourceUrl } },
        meta: { page: { url: currentPageUrl } },
      } as never) as unknown as {
        payload: { attributes: { name: string } };
      };

      expect(result.payload.attributes.name).toBe(expected);
    }
  });
});

describe("APM-konfigurasjon", () => {
  it("lar @nais/apm eie standardene", () => {
    expect(browserApmOptions).toMatchObject({
      app: BROWSER_APM_APP,
      namespace: BROWSER_APM_NAMESPACE,
      beforeSend: normalizeBrowserTelemetry,
      faro: { pageTracking: { generatePageId: expect.any(Function) } },
    });
    expect(browserApmOptions.tracing).toBe(true);
    expect(browserApmOptions).not.toHaveProperty("sessionReplay");
    expect(browserApmOptions).not.toHaveProperty("screenshotOnError");
  });
});
