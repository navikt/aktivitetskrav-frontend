import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { getToken, requestOboToken, validateToken } from "@navikt/oasis";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerEnv } from "@/env/serverEnv";

const AKTIVITETSKRAV_BACKEND_HOSTNAME = "aktivitetskrav-backend";

export const isMockRuntimeEnvironment = (): boolean =>
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";

export const respondMethodNotAllowed = (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethod: "GET" | "POST",
): void => {
  res.setHeader("Allow", allowedMethod);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export async function proxyAktivitetskravBackendRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  path: string,
): Promise<void> {
  const token = getToken(req);

  if (!token) {
    console.warn("Missing user token for aktivitetskrav proxy request");
    res.status(401).end("Unauthorized");
    return;
  }

  const validationResult = await validateToken(token);

  if (!validationResult.ok) {
    console.warn("Token validation failed for aktivitetskrav proxy request", {
      errorType: validationResult.errorType,
    });
    res.status(401).end("Unauthorized");
    return;
  }

  const oboTokenResult = await requestOboToken(
    token,
    getServerEnv().AKTIVITETSKRAV_BACKEND_CLIENT_ID,
  );

  if (!oboTokenResult.ok) {
    console.error(
      "OBO token request failed for aktivitetskrav proxy request",
      { error: oboTokenResult.error.message },
    );
    res.status(502).end("Bad Gateway");
    return;
  }

  try {
    await proxyApiRouteRequest({
      req,
      res,
      hostname: AKTIVITETSKRAV_BACKEND_HOSTNAME,
      path,
      bearerToken: oboTokenResult.token,
      https: false,
    });
  } catch (error) {
    console.error("Proxy request to aktivitetskrav-backend failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    if (!res.writableEnded) {
      res.status(502).end("Bad Gateway");
    }
  }
}
