import type { NextApiRequest, NextApiResponse } from "next";

export default function messenger(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    res.status(200).json({message: 'done'})
}