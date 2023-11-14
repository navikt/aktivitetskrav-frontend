import type { NextApiRequest, NextApiResponse } from "next";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import fixtures from "@/mocks/fixtures";
import { TestScenario } from "@/utils/testScenarioUtils";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AktivitetskravVurdering | null>,
) {
  if (
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
  ) {
    const testScenario: TestScenario = _req.headers[
      "testscenario"
    ] as TestScenario;

    switch (testScenario) {
      case "INFOSIDE": {
        res.status(200).json(fixtures.nyKandidatVurdering);
      }
      case "FORHANDSVARSEL": {
        res.status(200).json(fixtures.forhaandsvarselVurdering);
      }
    }
  } else {
    res.status(404).json(null);
  }
}
