import type { NextApiRequest, NextApiResponse } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { getToken, requestOboToken, validateToken } from "@navikt/oasis";
import { _resetServerEnvCache } from "@/env/serverEnv";
import handler from "@/pages/api/aktivitetsplikt/les";

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
    method: "POST",
    headers: {},
    url: "/syk/aktivitetskrav/api/aktivitetsplikt/les",
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

describe("les API route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.AKTIVITETSKRAV_BACKEND_CLIENT_ID =
      "dev-gcp:team-esyfo:aktivitetskrav-backend";
    _resetServerEnvCache();
  });

  it.each(["local", "demo"])(
    "returns OK in %s runtime",
    async (runtimeEnvironment) => {
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = runtimeEnvironment;
      const response = createMockResponse();

      await handler(createMockRequest(), response);

      expect(response.statusCode).toBe(200);
      expect(response.jsonBody).toBe("OK");
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
    const request = createMockRequest();
    const response = createMockResponse();

    await handler(request, response);

    expect(proxyApiRouteRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        req: request,
        res: response,
        hostname: "aktivitetskrav-backend",
        path: "/api/v1/aktivitetsplikt/les",
        bearerToken: "obo-token",
        https: false,
      }),
    );
    expect(validateToken).toHaveBeenCalledWith("subject-token");
    expect(requestOboToken).toHaveBeenCalledWith(
      "subject-token",
      "dev-gcp:team-esyfo:aktivitetskrav-backend",
    );
  });

  it("returns 502 when proxy request throws", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    vi.mocked(getToken).mockReturnValue("subject-token");
    vi.mocked(validateToken).mockResolvedValue({ ok: true, payload: {} });
    vi.mocked(requestOboToken).mockResolvedValue({
      ok: true,
      token: "obo-token",
    });
    vi.mocked(proxyApiRouteRequest).mockRejectedValue(
      new Error("ECONNREFUSED"),
    );
    const response = createMockResponse();

    await handler(createMockRequest(), response);

    expect(response.statusCode).toBe(502);
    expect(response.endedBody).toBe("Bad Gateway");
  });

  it("returns 405 for unsupported methods", async () => {
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT = "dev";
    const request = createMockRequest({ method: "GET" });
    const response = createMockResponse();

    await handler(request, response);

    expect(response.statusCode).toBe(405);
    expect(response.headers.Allow).toBe("POST");
    expect(response.endedBody).toBe("Method GET Not Allowed");
  });
});
