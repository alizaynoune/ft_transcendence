import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { users, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { GetUserQuery } from "src/interfaces/user.interface";
import { AchievementsService } from "src/achievements/achievements.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private achievements: AchievementsService) {}

  async user(usersWhereUniqueInput: Prisma.usersWhereUniqueInput): Promise<users | null> {
    try {
      return await this.prisma.users.findUnique({
        where: usersWhereUniqueInput,
      });
    } catch (error) {
      return error;
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.users.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      return error;
    }
  }

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    try {
      return await this.prisma.users.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    params: {
      data: Prisma.usersUpdateInput;
    }
  ) {
    const { data } = params;
    try {
      if (data.img_url) await this.achievements.photogenic(req.user.sub, "GOLD");
      if (data.cover) await this.achievements.photogenic(req.user.sub, "PLATINUM");
      const user = await this.prisma.users.update({
        where: { intra_id: req.user.sub },
        data,
      });
      return res.status(201).json(user);
    } catch (error) {
      

      return res.status(500).json({ message: "error server" });
    }
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<users> {
    try {
      return await this.prisma.users.delete({
        where,
      });
    } catch (error) {
      return error;
    }
  }

  async getAllUsers(userId: number, dto: GetUserQuery, res: Response) {
    const pageSize = dto.pageSize || 22;
    const cursor = dto.cursor || 1;
    try {
      const data = await this.prisma.users.findMany({
        take: pageSize,
        cursor: { id: cursor },
        where: {
          AND: [
            {
              blocked_blocked_useridTousers: { none: { userid: userId } },
            },
            {
              blocked_blocked_blockedidTousers: { none: { userid: userId } },
            },
            { intra_id: { not: userId } },
            { OR: [{ username: { contains: dto.findBy } }, { email: { contains: dto.findBy } }] },
          ],
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async setTwoFactorAuthenticationSecret(userId: number, secret: string) {
    try {
      await this.prisma.users.update({
        where: { intra_id: userId },
        data: { two_factor_secret: secret, two_factor_activate: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async disableTwoFactorAuthentication(userId: number) {
    try {
      return await this.prisma.users.update({
        where: { intra_id: userId },
        data: { two_factor_activate: false, two_factor_secret: null },
      });
    } catch (error) {
      throw error;
    }
  }
}
