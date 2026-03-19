import type { NextApiRequest, NextApiResponse } from "next";
import {
  isMockRuntimeEnvironment,
  proxyAktivitetskravBackendRequest,
  respondMethodNotAllowed,
} from "@/utils/aktivitetskravApiProxyUtils";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  if (req.method !== "POST") {
    respondMethodNotAllowed(req, res, "POST");
    return;
  }

  if (isMockRuntimeEnvironment()) {
    res.status(200).json("OK");
    return;
  }

  await proxyAktivitetskravBackendRequest(
    req,
    res,
    "/api/v1/aktivitetsplikt/les",
  );
}
