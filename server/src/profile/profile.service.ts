import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response, Request } from 'express';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // get profile
  async profile(req: Request, res: Response, params: any) {
    try {
      const slector = params.username
        ? { username: params.username }
        : { intra_id: req.user.sub };
      const data = await this.prisma.users.findUnique({
        where: {
          ...slector,
        },
        include: { users_achievements: { select: { achievements: true } } },
      });
      if (!data) throw 'user not found';
    //   console.log(data.intra_id, req.user.sub);

      const achiev = data.users_achievements.map((e) => {
        return Object.values(e)[0];
      });
      const ret = { ...data, users_achievements: achiev };
      return res.status(200).json(ret);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }
}
