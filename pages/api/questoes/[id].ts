import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    id: number;
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    res.status(200).json({
        id: Number(req.query.id),
        name: "John Doe"
    });
}