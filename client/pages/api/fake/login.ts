import type { NextApiRequest, NextApiResponse } from "next";


// https://randomuser.me/api/?&inc=name,email,picture,login&noinfo
export default function login(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    fetch('https://randomuser.me/api/?&inc=name,email,picture,login&noinfo')
    .then(d => d.json())
    .then(body => {
        console.log(body);
        const result = body.results[0]
        const data = {
            id: result.login.uuid,
            email: result.email,
            name: result.name,
            username: result.login.username,
            avatar: result.picture.large,
            token: 'token'
        }
        res.status(200).json(data)
    })
}