import { Injectable } from "@nestjs/common";
import { Response, Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationsService {
    constructor(private prismaService: PrismaService) {}

    async getNotifications(req: Request, res: Response) {
        try {
            const notifications = await this.prismaService.notification.findMany({
                where: { AND: [{ userid: req.user.sub }, { read: false }] },
                include: { users_notification_fromidTousers: true },
                orderBy: { created_at: "desc" },
            });
            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: "server error" });
        }
    }
}
