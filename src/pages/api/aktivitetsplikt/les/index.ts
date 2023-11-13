import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local") {
    res.status(200).json("OK");
  } else {
    res.status(404).json("");
  }
}
