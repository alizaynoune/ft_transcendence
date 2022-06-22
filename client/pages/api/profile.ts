// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ProfileType} from './types'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileType>
) {
  const data = {
    firstname: 'user name',
    lastname: 'last name',
    email: 'user@email.com',
    phone: '+2120000000',
    birthday: '20/12/2022',
    location: 'morocco',
    avatar: 'https://robohash.org/molestiaelaborealiquid.png?size=300x300&set=set1'
  }
  
  res.status(200).json(data)
}