import type { NextApiRequest, NextApiResponse } from "next";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import {
  isMockRuntimeEnvironment,
  proxyAktivitetskravBackendRequest,
  respondMethodNotAllowed,
} from "@/utils/aktivitetskravApiProxyUtils";
import {
  getAktivitetskravVurderingForScenario,
  type TestScenario,
} from "@/utils/testScenarioUtils";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AktivitetskravVurdering[] | null>,
) {
  if (req.method !== "GET") {
    respondMethodNotAllowed(req, res, "GET");
    return;
  }

  if (isMockRuntimeEnvironment()) {
    const testScenario = req.headers.testscenario as TestScenario;

    res.status(200).json(getAktivitetskravVurderingForScenario(testScenario));
    return;
  }

  await proxyAktivitetskravBackendRequest(
    req,
    res,
    "/api/v1/aktivitetsplikt/historikk",
  );
}
