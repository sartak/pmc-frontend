import { NextApiRequest, NextApiResponse } from "next";
import { getDistinctTags } from "../../lib/media";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      tags: Array.from(getDistinctTags()).sort(),
    });
  } else {
    res.status(405);
  }
}
