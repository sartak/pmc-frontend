import { NextApiRequest, NextApiResponse } from "next";
import { getDistinctSpokenLangs } from "../../lib/media";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      langs: Array.from(getDistinctSpokenLangs()).sort(),
    });
  } else {
    return res.status(405).end();
  }
}
