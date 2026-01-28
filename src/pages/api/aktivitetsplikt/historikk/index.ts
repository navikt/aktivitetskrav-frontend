import type { NextApiRequest, NextApiResponse } from "next";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import {
  getAktivitetskravVurderingForScenario,
  type TestScenario,
} from "@/utils/testScenarioUtils";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AktivitetskravVurdering[] | null>,
) {
  if (
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
  ) {
    const testScenario: TestScenario = _req.headers[
      "testscenario"
    ] as TestScenario;

    res.status(200).json(getAktivitetskravVurderingForScenario(testScenario));
  } else {
    res.status(404).json(null);
  }
}
