import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { acceptRequestBody, blockRequestBody, friendRequestBody, unfriendRequestBody } from "../interfaces/user.interface";
import { PrismaService } from "../prisma/prisma.service";
import { getFriends, getInvites } from "./helper";
import { NotificationsGateway } from "src/notifications/notifications.gateway";
import { AchievementsService } from "src/achievements/achievements.service";

@Injectable()
export class FriendsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
    private achievements: AchievementsService
  ) {}
  //Send new Friend Request
  async sendRequest(dto: friendRequestBody, userId: number, res: Response) {
    try {
      // check if user not blocked
      const blocked = await this.prisma.blocked.findMany({
        where: {
          AND: [
            {
              userid: userId,
            },
            {
              blockedid: Number(dto.id),
            },
          ],
        },
      });
      // check if user already in friends list
      const data = await this.prisma.invites.findMany({
        where: {
          OR: [
            {
              senderid: userId,
              receiverid: Number(dto.id),
            },
            {
              senderid: Number(dto.id),
              receiverid: userId,
            },
          ],
        },
      });
      // check if the user not sending the request to himself
      if (Number(dto.id) === userId) {
        return res.status(400).json({
          message: "You cannot send a request to yourself",
        });
      }
      // cehck if user in blocked list
      if (blocked.length > 0) {
        return res.status(400).json({
          message: "You are blocked by this user or you have blocked this user",
        });
      }

      if (blocked.length === 0 && data.length < 1) {
        await this.prisma.invites.create({
          data: {
            senderid: userId,
            receiverid: Number(dto.id),
            accepted: false,
          },
        });
        const notif = await this.prisma.notification.create({
          data: {
            userid: Number(dto.id),
            type: "FRIEND_REQUEST",
            fromid: userId,
            targetid: 2,
            content: "send you a freind request",
            created_at: new Date(),
          },
          include: { users_notification_fromidTousers: true },
        });
        this.notificationsGateway.notificationsToUser(Number(dto.id), notif);
        return res.status(200).json({
          message: "Friend Request Sent",
        });
      } else {
        return res.status(400).json({
          message: "Friend Request Already Sent",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Friend Request Failed, Please Try Again or shoose another user",
        error: error,
      });
    }
  }
  // Get all Invites
  async getInvites(id: number, res: Response) {
    try {
      const data = await this.prisma.invites.findMany({
        where: {
          receiverid: id,
          accepted: false,
        },
        include: {
          users_invites_senderidTousers: true,
        },
      });
      const invites = await getInvites(data);
      return res.status(200).json({
        invites,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }

  //Accept Friend Request
  async acceptRequest(dto: acceptRequestBody, userId: number, res: Response) {
    try {
      const data = await this.prisma.invites.findFirst({
        where: {
          // id: Number(dto.id),
          AND: [{ senderid: Number(dto.id) }, { receiverid: userId }],
        },
      });
      if (data) {
        await this.prisma.friends.create({
          data: {
            userid: data.senderid,
            friendid: data.receiverid,
          },
        });
        await this.prisma.invites.delete({
          where: {
            id: data.id,
          },
        });
        const notif = await this.prisma.notification.create({
          data: {
            userid: Number(dto.id),
            type: "OTHER",
            fromid: userId,
            content: "accept your friend request",
            created_at: new Date(),
          },
          include: { users_notification_fromidTousers: true },
        });
        this.notificationsGateway.notificationsToUser(Number(dto.id), notif);
        await this.achievements.friendly(data.senderid);
        await this.achievements.friendly(data.receiverid);
        return res.status(200).json({
          message: "Friend Request Accepted",
        });
      }
      return res.status(400).json({
        message: "You are not the receiver of this request",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }

  //Reject Friend Request
  async rejectRequest(dto: acceptRequestBody, userId: number, res: Response) {
    try {
      const data = await this.prisma.invites.findFirst({
        where: {
          // id: Number(dto.id),
          AND: [{ senderid: Number(dto.id) }, { receiverid: userId }],
        },
      });
      if (data) {
        await this.prisma.invites.delete({
          where: {
            id: data.id,
          },
        });
        return res.status(200).json({
          message: "Reject Friend Request Success",
        });
      }
      return res.status(400).json({
        message: "You are not the receiver of this request",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }

  // Unfriend
  async unfriend(dto: unfriendRequestBody, res: Response) {
    try {
      const data = await this.prisma.friends.findMany({
        where: {
          OR: [
            {
              userid: Number(dto.id),
            },
            {
              friendid: Number(dto.id),
            },
          ],
        },
      });

      if (data.length > 0) {
        await this.prisma.friends.delete({
          where: {
            id: data[0].id,
          },
        });
        return res.status(200).json({
          message: "Unfriend Success",
        });
      }
      return res.status(400).json({
        message: "You are not friends with this user",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }

  //Get all Friends
  async getFriends(req: any, res: Response) {
    try {
      const data = await this.prisma.friends.findMany({
        where: {
          OR: [
            {
              userid: req.user.sub,
            },
            {
              friendid: req.user.sub,
            },
          ],
        },
        include: {
          users_friends_friendidTousers: true,
          users_friends_useridTousers: true,
        },
      });

      const friends = await getFriends(data, req.user.sub);
      if (friends.length < 1) {
        return res.status(200).json({
          message: "You have no friends",
        });
      }
      return res.status(200).json({
        friends,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }

  //Get Friends by username
  async getFriendsByUsername(req: any, res: Response) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username: req.params.username,
        },
      });
      const data = await this.prisma.friends.findMany({
        where: {
          OR: [
            {
              userid: user.intra_id,
            },
            {
              friendid: user.intra_id,
            },
          ],
        },
        include: {
          users_friends_friendidTousers: true,
          users_friends_useridTousers: true,
        },
      });

      const friends = await getFriends(data, user.intra_id);
      if (friends.length < 1) {
        return res.status(200).json({
          message: "There is no friends",
        });
      }
      return res.status(200).json({
        friends,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }

  //Block Friend
  async blockFriend(dto: blockRequestBody, req: any, res: Response) {
    try {
      if (Number(dto.id) === req.user.sub) {
        return res.status(400).json({
          message: "You cannot block yourself",
        });
      }
      // Delete invite if exists
      await this.prisma.invites.deleteMany({
        where: {
          OR: [
            {
              senderid: req.user.sub,
              receiverid: Number(dto.id),
            },
            {
              senderid: Number(dto.id),
              receiverid: req.user.sub,
            },
          ],
        },
      });
      // Delete Friend if exists
      await this.prisma.friends.deleteMany({
        where: {
          OR: [
            {
              userid: req.user.sub,
              friendid: Number(dto.id),
            },
            {
              userid: Number(dto.id),
              friendid: req.user.sub,
            },
          ],
        },
      });
      // Delete GameInvitations
      await this.prisma.gameinvites.deleteMany({
        where: {
          OR: [
            {
              AND: [{ userid: Number(dto.id) }, { fromid: req.user.sub }],
            },
            { AND: [{ userid: req.user.sub }, { fromid: Number(dto.id) }] },
          ],
          accepted: false,
        },
      });
      // Delete Notifications
      await this.prisma.notification.deleteMany({
        where: {
          OR: [
            { AND: [{ userid: Number(dto.id) }, { fromid: req.user.sub }] },
            { AND: [{ userid: req.user.sub }, { fromid: Number(dto.id) }] },
          ],
          read: false,
        },
      });
      // END All Games
      await this.prisma.game.updateMany({
        where: { AND: [{ players: { some: { userid: Number(dto.id) } } }, { players: { some: { userid: req.user.sub } } }] },
        data: { status: "END" },
      });

      // disactivat all DIRECT conversations
      await this.prisma.conversation.deleteMany({
        where: {
          type: "DIRECT",
          AND: [{ members: { some: { userid: Number(dto.id) } } }, { members: { some: { userid: req.user.sub } } }],
        },
      });

      // Block Friend
      const blocked = await this.prisma.blocked.findMany({
        where: {
          OR: [
            { userid: req.user.sub, blockedid: Number(dto.id) },
            {
              userid: Number(dto.id),
              blockedid: req.user.sub,
            },
          ],
        },
      });
      if (blocked.length < 1) {
        await this.prisma.blocked.create({
          data: {
            userid: req.user.sub,
            blockedid: Number(dto.id),
          },
        });
        return res.status(200).json({
          message: "Friend Blocked",
        });
      } else {
        return res.status(400).json({
          message: "Friend Already Blocked",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Couldn't block friend",
        error: error,
      });
    }
  }

  // get blocked user
  async getBlockedUsers(req: any, res: Response) {
    try {
      const data = await this.prisma.blocked.findMany({
        where: {
          userid: req.user.sub,
        },
        include: {
          users_blocked_blockedidTousers: true,
        },
      });
      if (data.length > 0) return res.status(200).json(data);
      else
        return res.status(200).json({
          message: "You have no blocked users",
        });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }

  // unblock user
  async unblockUser(dto: blockRequestBody, req: any, res: Response) {
    try {
      const data = await this.prisma.blocked.findMany({
        where: {
          userid: req.user.sub,
          blockedid: Number(dto.id),
        },
      });
      if (data.length > 0) {
        await this.prisma.blocked.delete({
          where: {
            id: data[0].id,
          },
        });
        return res.status(200).json({
          message: "User Unblocked",
        });
      }
      return res.status(400).json({
        message: "User is not blocked",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }
}
