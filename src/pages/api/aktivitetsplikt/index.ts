import type { NextApiRequest, NextApiResponse } from "next";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import fixtures from "@/mocks/fixtures";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AktivitetskravVurdering | null>,
) {
  if (process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local") {
    res.status(200).json(fixtures.forhaandsvarselVurdering);
  } else {
    res.status(404).json(null);
  }
}
