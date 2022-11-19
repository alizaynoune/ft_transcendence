import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Response, Request } from "express";

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {string} username
   * @returns {Promise<Response>}
   **/
  async profile(req: Request, res: Response, username: string): Promise<Response> {
    try {
      if (!username) {
        const user = await this.prisma.users.findUnique({
          where: { intra_id: req.user.sub },
          include: { users_achievements: { select: { achievements: true } } },
        });
        if (!user) return res.status(404).json({ message: "user not found" });
        return res.status(200).json(user);
      }
      const user = await this.prisma.users.findFirst({
        where: {
          AND: [
            { username },
            { NOT: { blocked_blocked_useridTousers: { some: { blockedid: req.user.sub } } } },
            { NOT: { blocked_blocked_blockedidTousers: { some: { userid: req.user.sub } } } },
          ],
        },
        include: { users_achievements: { select: { achievements: true } } },
      });
      if (!user) return res.status(404).json({ message: "user not found" });
      const isFriend = await this.prisma.friends.findFirst({
        where: {
          OR: [
            {
              AND: [{ userid: req.user.sub }, { friendid: user.intra_id }],
            },
            {
              AND: [{ userid: user.intra_id }, { friendid: req.user.sub }],
            },
          ],
        },
      });

      if (isFriend) return res.status(200).json({ relationship: { isFriend: true }, ...user });
      const relationship = await this.prisma.invites.findFirst({
        where: {
          OR: [
            {
              AND: [{ receiverid: req.user.sub }, { senderid: user.intra_id }],
            },
            {
              AND: [{ receiverid: user.intra_id }, { senderid: req.user.sub }],
            },
          ],
        },
      });
      if (relationship) return res.status(200).json({ relationship, ...user });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  }
}
