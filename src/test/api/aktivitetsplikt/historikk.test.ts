import type { NextApiRequest, NextApiResponse } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { getToken, requestOboToken, validateToken } from "@navikt/oasis";
import {
  ForhandsvarselTestScenario,
  getAktivitetskravVurderingForScenario,
} from "@/utils/testScenarioUtils";
import { _resetServerEnvCache } from "@/env/serverEnv";
import handler from "@/pages/api/aktivitetsplikt/historikk";

vi.mock("@navikt/next-api-proxy", () => ({
  proxyApiRouteRequest: vi.fn(),
}));

vi.mock("@navikt/oasis", () => ({
  getToken: vi.fn(),
  requestOboToken: vi.fn(),
  validateToken: vi.fn(),
}));

interface MockResponseBody {
  statusCode: number;
  headers: Record<string, string>;
  jsonBody?: unknown;
  endedBody?: string;
}

const createMockRequest = (
  overrides: Partial<NextApiRequest> = {},
): NextApiRequest =>
  ({
    method: "GET",
    headers: {},
    url: "/syk/aktivitetskrav/api/aktivitetsplikt/historikk",
    ...overrides,
  }) as NextApiRequest;

const createMockResponse = (): NextApiResponse & MockResponseBody => {
  const response = {
    statusCode: 200,
    headers: {},
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.jsonBody = body;
      return this;
    },
    end(body?: string) {
      this.endedBody = body;
      return this;
    },
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
  };

  return response as NextApiResponse & MockResponseBody;
};

describe("historikk API route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AKTIVITETSKRAV_BACKEND_CLIENT_ID =
      "dev-gcp:team-esyfo:aktivitetskrav-backend";
    _resetServerEnvCache();
  });

  it.each(["local", "demo"])(
    "returns mock data in %s runtime",
    async (runtimeEnvironment) => {
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = runtimeEnvironment;
      const request = createMockRequest({
        headers: { testscenario: ForhandsvarselTestScenario },
      });
      const response = createMockResponse();

      await handler(request, response);

      expect(response.statusCode).toBe(200);
      expect(response.jsonBody).toEqual(
        getAktivitetskravVurderingForScenario(ForhandsvarselTestScenario),
      );
      expect(proxyApiRouteRequest).not.toHaveBeenCalled();
    },
  );

  it("returns 401 when user token is missing in dev", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    vi.mocked(getToken).mockReturnValue(null);
    const response = createMockResponse();

    await handler(createMockRequest(), response);

    expect(response.statusCode).toBe(401);
    expect(response.endedBody).toBe("Unauthorized");
    expect(proxyApiRouteRequest).not.toHaveBeenCalled();
  });

  it("returns 401 when token validation fails in dev", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    vi.mocked(getToken).mockReturnValue("subject-token");
    vi.mocked(validateToken).mockResolvedValue({
      ok: false,
      error: new Error("token expired"),
      errorType: "EXPIRED",
    });
    const response = createMockResponse();

    await handler(createMockRequest(), response);

    expect(response.statusCode).toBe(401);
    expect(response.endedBody).toBe("Unauthorized");
    expect(requestOboToken).not.toHaveBeenCalled();
    expect(proxyApiRouteRequest).not.toHaveBeenCalled();
  });

  it("returns 502 when obo token request fails in dev", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    vi.mocked(getToken).mockReturnValue("subject-token");
    vi.mocked(validateToken).mockResolvedValue({ ok: true, payload: {} });
    vi.mocked(requestOboToken).mockResolvedValue({
      ok: false,
      error: new Error("obo failed"),
    });
    const response = createMockResponse();

    await handler(createMockRequest(), response);

    expect(response.statusCode).toBe(502);
    expect(response.endedBody).toBe("Bad Gateway");
    expect(proxyApiRouteRequest).not.toHaveBeenCalled();
  });

  it("proxies request with obo token in dev", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    vi.mocked(getToken).mockReturnValue("subject-token");
    vi.mocked(validateToken).mockResolvedValue({ ok: true, payload: {} });
    vi.mocked(requestOboToken).mockResolvedValue({
      ok: true,
      token: "obo-token",
    });
    const request = createMockRequest({
      url: "/syk/aktivitetskrav/api/aktivitetsplikt/historikk?foo=bar",
    });
    const response = createMockResponse();

    await handler(request, response);

    expect(validateToken).toHaveBeenCalledWith("subject-token");
    expect(requestOboToken).toHaveBeenCalledWith(
      "subject-token",
      "dev-gcp:team-esyfo:aktivitetskrav-backend",
    );
    expect(proxyApiRouteRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        req: request,
        res: response,
        hostname: "aktivitetskrav-backend",
        path: "/api/v1/aktivitetsplikt/historikk",
        bearerToken: "obo-token",
        https: false,
      }),
    );
  });

  it("returns 405 for unsupported methods", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    const request = createMockRequest({ method: "POST" });
    const response = createMockResponse();

    await handler(request, response);

    expect(response.statusCode).toBe(405);
    expect(response.headers.Allow).toBe("GET");
    expect(response.endedBody).toBe("Method POST Not Allowed");
  });
});
