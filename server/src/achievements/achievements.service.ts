import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AchievementsService {
    constructor(private prismaService: PrismaService) {}

    async getAllAchievements(req: Request, res: Response) {
        try {
            const achievList = await this.prismaService.achievements.findMany({
                include: { users_achievements: { where: { userid: req.user.sub } } },
            });

            return res.status(200).json(achievList);
        } catch (error) {
            res.status(500).json({ message: "sever error" });
        }
    }

    async friendly(userId: number) {
        try {
            const friends = await this.prismaService.friends.count({
                where: { OR: [{ userid: userId }, { friendid: userId }] },
            });
            const achievLevel =
                friends === 10
                    ? "SILVER"
                    : friends === 20
                    ? "BRONZE"
                    : friends === 50
                    ? "GOLD"
                    : friends === 100
                    ? "PLATINUM"
                    : null;
            if (achievLevel) {
                await this.prismaService.users_achievements.upsert({
                    where: {
                        userid_achievementname_achievementlevel: {
                            userid: userId,
                            achievementname: "friendly",
                            achievementlevel: achievLevel,
                        },
                    },
                    create: { userid: userId, achievementname: "friendly", achievementlevel: achievLevel },
                    update: {},
                });
            }
        } catch (error) {}
    }
    async legendary(userId: number) {
        try {
            const matches = await this.prismaService.game.count({
                where: {
                    AND: [
                        {
                            players: { some: { userid: userId, score: 10 } },
                        },
                        { players: { some: { userid: { not: userId }, score: 0 } } },
                    ],
                },
            });
            const achievLevel =
                matches === 1 ? "SILVER" : matches === 2 ? "BRONZE" : matches === 3 ? "GOLD" : matches === 4 ? "PLATINUM" : null;
            if (achievLevel) {
                await this.prismaService.users_achievements.upsert({
                    where: {
                        userid_achievementname_achievementlevel: {
                            userid: userId,
                            achievementname: "legendary",
                            achievementlevel: achievLevel,
                        },
                    },
                    create: { userid: userId, achievementname: "legendary", achievementlevel: achievLevel },
                    update: {},
                });
            }
        } catch (error) {}
    }
    async sharpshooter(userId: number) {
        try {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            const matches = await this.prismaService.game.count({
                where: {
                    AND: [
                        { updated_at: { gte: date } },
                        {
                            players: { some: { userid: userId, score: 10 } },
                        },
                        { players: { some: { userid: { not: userId }, score: 0 } } },
                    ],
                },
            });
            const achievLevel =
                matches === 2 ? "SILVER" : matches === 3 ? "BRONZE" : matches === 4 ? "GOLD" : matches === 5 ? "PLATINUM" : null;
            if (achievLevel) {
                await this.prismaService.users_achievements.upsert({
                    where: {
                        userid_achievementname_achievementlevel: {
                            userid: userId,
                            achievementname: "sharpshooter",
                            achievementlevel: achievLevel,
                        },
                    },
                    create: { userid: userId, achievementname: "sharpshooter", achievementlevel: achievLevel },
                    update: {},
                });
            }
        } catch (error) {}
    }
    async wildfire(userId: number) {
        try {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            const matches = await this.prismaService.game.count({
                where: {
                    AND: [
                        { updated_at: { gte: date } },
                        {
                            players: { some: { userid: userId } },
                        },
                    ],
                },
            });
            const achievLevel =
                matches === 5
                    ? "SILVER"
                    : matches === 10
                    ? "BRONZE"
                    : matches === 15
                    ? "GOLD"
                    : matches === 20
                    ? "PLATINUM"
                    : null;
            if (achievLevel) {
                await this.prismaService.users_achievements.upsert({
                    where: {
                        userid_achievementname_achievementlevel: {
                            userid: userId,
                            achievementname: "wildfire",
                            achievementlevel: achievLevel,
                        },
                    },
                    create: { userid: userId, achievementname: "wildfire", achievementlevel: achievLevel },
                    update: {},
                });
            }
        } catch (error) {}
    }

    async gameAchievemets(userId: number) {
        await this.legendary(userId);
        await this.sharpshooter(userId);
        await this.wildfire(userId);
    }

    async photogenic(userId: number, level: "GOLD" | "PLATINUM") {
        try {
            await this.prismaService.users_achievements.upsert({
                where: {
                    userid_achievementname_achievementlevel: {
                        userid: userId,
                        achievementname: "photogenic",
                        achievementlevel: level,
                    },
                },
                create: { userid: userId, achievementname: "photogenic", achievementlevel: level },
                update: {},
            });
        } catch (error) {}
    }
}
