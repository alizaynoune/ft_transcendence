import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  acceptRequestBody,
  blockRequestBody,
  friendRequestBody,
} from '../interfaces/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { getFriends, getInvites } from './helper';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  //Send new Friend Request
  async sendRequest(dto: friendRequestBody, userId: number, res: Response) {
    try {
      if (Number(dto.requestedId) === userId) {
        return res.status(400).json({
          message: 'You cannot send a request to yourself',
        });
      }
      const data = await this.prisma.invites.findMany({
        where: {
          OR: [
            {
              senderid: userId,
              receiverid: Number(dto.requestedId),
            },
            {
              senderid: Number(dto.requestedId),
              receiverid: userId,
            },
          ],
        },
      });
      if (data.length < 1) {
        await this.prisma.invites.create({
          data: {
            senderid: userId,
            receiverid: Number(dto.requestedId),
            accepted: false,
          },
        });
        return res.status(200).json({
          message: 'Friend Request Sent',
        });
      } else {
        return res.status(400).json({
          message: 'Friend Request Already Sent',
        });
      }
    } catch (error) {
      return res.status(400).json({
        message:
          'Friend Request Failed, Please Try Again or shoose another user',
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
  async acceptRequest(dto: acceptRequestBody, userId: Number, res: Response) {
    try {
      const data = await this.prisma.invites.findUnique({
        where: {
          id: Number(dto.id),
        },
      });
      if (data.receiverid === userId) {
        await this.prisma.friends.create({
          data: {
            userid: data.senderid,
            friendid: data.receiverid,
          },
        });
        await this.prisma.invites.delete({
          where: {
            id: Number(dto.id),
          },
        });
        return res.status(200).json({
          message: 'Friend Request Accepted',
        });
      }
      return res.status(400).json({
        message: 'You are not the receiver of this request',
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  //Reject Friend Request
  async rejectRequest(dto: acceptRequestBody, userId: Number, res: Response) {
    try {
      const data = await this.prisma.invites.findUnique({
        where: {
          id: Number(dto.id),
        },
      });
      if (data.receiverid === userId) {
        await this.prisma.invites.delete({
          where: {
            id: Number(dto.id),
          },
        });
        return res.status(200).json({
          message: 'Reject Friend Request Success',
        });
      }
      return res.status(400).json({
        message: 'You are not the receiver of this request',
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
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
          message: 'You have no friends',
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
          message: 'You cannot block yourself',
        });
      }
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
          message: 'Friend Blocked',
        });
      } else {
        return res.status(400).json({
          message: 'Friend Already Blocked',
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Couldn't block friend",
        error: error,
      });
    }
  }
}
