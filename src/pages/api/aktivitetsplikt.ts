import type { NextApiRequest, NextApiResponse } from "next";
import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import fixtures from "@/mocks/fixtures";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AktivitetskravVurdering>,
) {
  res.status(200).json(fixtures.unntakVurdering);
}
