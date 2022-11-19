import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import {
  CreateConversation,
  LeaveConvesation,
  MessageDTO,
  ToggleMuteUser,
  PaginationDTO,
  ConversationDataReturn,
  JoinConversation,
  ToggleBanUser,
  GetConversation,
  GetMessages,
  ConversationUpdate,
  Conversation,
  ToggleAdmin,
  Search,
} from "src/interfaces/user.interface";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import { ChatGateway } from "./chat.gateway";
import { Prisma } from "@prisma/client";
@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService, private chatGateway: ChatGateway) {}
  private salt = 10;

  async searshConversation(res: Response, userId: number, dto: Search) {
    try {
      const pageSize = dto.pageSize || 20;
      const cursor = dto.cursor || 1;
      const data = await this.prismaService.conversation.findMany({
        take: pageSize,
        cursor: { id: cursor },
        where: {
          title: { contains: dto.title },
          type: "GROUP",
          public: true,
          members: { none: { userid: userId, active: true } },
        },
        include: {
          members: {
            where: {
              users: {
                AND: [
                  { blocked_blocked_blockedidTousers: { none: { userid: userId } } },
                  { blocked_blocked_useridTousers: { none: { blockedid: userId } } },
                ],
              },
            },
            include: { users: true },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }

  // TODO update
  async getConversation(res: Response, userId: number, dto: GetConversation & Conversation) {
    try {
      const currentDate = new Date();
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          AND: [{ id: dto.id }, { members: { some: { userid: userId, active: true, ban: false, endban: { lt: currentDate } } } }],
        },
        include: { members: { include: { users: true } } },
      });
      if (!conversation) return res.status(400).json({ message: "conversation not found" });
      if (conversation.protected && !dto.password) return res.status(404).json({ message: "unauthorized" });
      if (conversation.protected && !(await bcrypt.compare(dto.password, conversation.password)))
        return res.status(404).json({ message: "unauthorized" });
      this.chatGateway.handleMemberJoinRoomChat(userId, conversation.id);
      return res.status(201).json(conversation);
    } catch (error) {
      

      return res.status(500).json({ message: "server error" });
    }
  }

  async getConversationMessages(res: Response, userId: number, dto: GetMessages) {
    // Todo check if user socket has room chat
    try {
      await this.chatGateway.handleUserInRoom(userId, dto.id);
      const Pagination = { take: dto.pageSize || 20 };
      dto.cursor && Object.assign(Pagination, { cursor: { id: dto.cursor } });
      const conversation = await this.prismaService.conversation.findFirst({
        where: { id: dto.id, members: { some: { userid: userId, active: true, ban: false } } },
      });
      if (!conversation) return res.status(400).json({ messages: "conversation not found" });
      const messages = await this.prismaService.message.findMany({
        where: {
          conversationid: conversation.id,
          users: {
            AND: [
              { blocked_blocked_blockedidTousers: { none: { userid: userId } } },
              { blocked_blocked_useridTousers: { none: { blockedid: userId } } },
            ],
          },
        },
        orderBy: { created_at: "desc" },
        include: { users: true },
        ...Pagination,
      });
      return res.status(200).json(messages);
    } catch (error) {
      

      return res.status(500).json({ message: "server error" });
    }
  }

  // TODO update
  async getAllConversation(res: Response, userId: number, query: PaginationDTO) {
    try {
      const Pagination = { take: query.pageSize || 20 };
      query.cursor && Object.assign(Pagination, { cursor: { id: query.cursor } });
      const currentDate = new Date();
      const conversations = await this.prismaService.conversation.findMany({
        ...Pagination,
        where: { members: { some: { userid: userId, active: true, ban: false, endban: { lt: currentDate } } } },
        orderBy: { updated_at: "desc" },
        include: {
          members: { include: { users: true } },
        },
      });
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }
  // ? done
  async createConversation(res: Response, userId: number, dto: CreateConversation) {
    try {
      const title = dto.title || "";
      var ids = [];
      const hashPassword = dto.password ? await bcrypt.hash(dto.password, this.salt) : null;
      if (dto.members) {
        const users = await this.prismaService.users.findMany({
          where: {
            AND: [
              { intra_id: { in: dto.members } },
              { NOT: { blocked_blocked_blockedidTousers: { some: { userid: userId } } } },
              { NOT: { blocked_blocked_useridTousers: { some: { blockedid: userId } } } },
            ],
          },
          select: { intra_id: true },
        });
        if (!users.length) return res.status(400).json({ message: "can't create conversation" });
        ids =
          users.map((u) => {
            return { userid: u.intra_id, isadmin: dto.type === "DIRECT" ? true : false };
          }) || [];
      }
      ids.push({ userid: userId, isadmin: true });
      const conversation = await this.prismaService.conversation.create({
        data: {
          type: dto.type,
          title,
          password: hashPassword,
          protected: hashPassword ? true : false,
          public: dto.public,
          members: { createMany: { data: ids } },
        },
        include: { members: { include: { users: true } } },
      });
      if (dto.message) {
        await this.prismaService.conversation.update({
          where: { id: conversation.id },
          data: {
            message: { create: { senderid: userId, message: dto.message } },
          },
        });
      }
      if (conversation.members.length > 1) this.chatGateway.handleEmitUpdateConversation(conversation, userId);
      this.chatGateway.handleMemberJoinRoomChat(userId, conversation.id);
      return res.status(200).json(plainToInstance(ConversationDataReturn, conversation));
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }

  async joinConversation(res: Response, userId: number, dto: JoinConversation & Conversation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: { id: dto.id, public: true, type: "GROUP", active: true },
      });
      if (!conversation) return res.status(404).json({ message: "conversation not found" });
      if (conversation.protected) {
        if (!dto.password) return res.status(404).json({ message: "Permission denied" });
        const passwordMatch = await bcrypt.compare(dto.password, conversation.password);
        if (!passwordMatch) return res.status(404).json({ message: "Permission denied" });
      }
      const admins = await this.prismaService.members.findMany({
        where: { conversationid: dto.id, active: true, isadmin: true },
      });
      const setAsAdmin = !admins.length;
      const join = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: {
          members: {
            upsert: {
              where: { conversationid_userid: { userid: userId, conversationid: dto.id } },
              create: { userid: userId },
              update: { active: true, isadmin: setAsAdmin },
            },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(join, userId);
      this.chatGateway.handleMemberJoinRoomChat(userId, join.id);
      return res.status(200).json(plainToInstance(ConversationDataReturn, join));
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async updateConversation(res: Response, userId: number, dto: ConversationUpdate & Conversation) {
    try {
      var users = null;
      if (dto.protected && !dto.password) return res.status(401).json({ message: "Bad Request" });
      if (dto.password) Object.assign(dto, { protected: true });
      
      
      const conversation = await this.prismaService.conversation.findFirst({
        where: { id: dto.id, type: "GROUP", members: { some: { userid: userId, isadmin: true, active: true } } },
      });
      if (!conversation) return res.status(400).json({ message: "conversation not found" });
      const dataUpdate: Prisma.conversationUpdateInput = {
        protected: dto.protected,
        title: dto.title,
        password: dto.protected ? await bcrypt.hash(dto.password, this.salt) : null,
        public: dto.public,
      };
      if (dto.members) {
        users = await this.prismaService.users.findMany({
          where: {
            AND: [
              { intra_id: { in: dto.members } },
              { NOT: { blocked_blocked_blockedidTousers: { some: { userid: userId } } } },
              { NOT: { blocked_blocked_useridTousers: { some: { blockedid: userId } } } },
              { NOT: { members: { some: { conversationid: dto.id } } } },
            ],
          },
          select: { intra_id: true },
        });
        const ids = users.map((u: { intra_id: number }) => {
          return { userid: u.intra_id };
        });
        await this.prismaService.conversation.update({
          where: { id: dto.id },
          data: { members: { create: ids } },
        });
      }
      const update = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: { ...dataUpdate },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      if (dto.password) this.chatGateway.handlePasswordChanged(userId, conversation.id);
      return res.status(201).json(update);
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async toggleAdmin(res: Response, userId: number, dto: ToggleAdmin & Conversation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          AND: [
            { id: dto.id },
            { type: "GROUP" },
            { members: { some: { userid: userId, isadmin: true } } },
            { members: { some: { userid: dto.userId, active: true, endban: { lt: new Date() }, endmute: { lt: new Date() } } } },
          ],
        },
        include: { members: { include: { users: true } } },
      });
      if (!conversation) return res.status(404).json({ message: "conversation or member not found" });
      const update = await this.prismaService.conversation.update({
        where: { id: conversation.id },
        data: {
          members: {
            update: {
              where: { conversationid_userid: { conversationid: conversation.id, userid: dto.userId } },
              data: { isadmin: dto.setAs, mute: false, ban: false, endban: new Date(), endmute: new Date() },
            },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      return res.status(201).json(update);
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async sendMessage(res: Response, userId: number, dto: MessageDTO & Conversation) {
    try {
      // todo check user socket in chat room
      await this.chatGateway.handleUserInRoom(userId, dto.id);
      const currentDate = new Date();
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          id: dto.id,
          active: true,
          members: {
            some: {
              userid: userId,
              active: true,
              ban: false,
              mute: false,
              endban: { lt: currentDate },
              endmute: { lt: currentDate },
            },
          },
        },
      });
      if (!conversation) return res.status(400).json({ message: "Bad Request" });
      const newMessage = await this.prismaService.message.create({
        data: { senderid: userId, conversationid: dto.id, message: dto.message },
        include: { users: true },
      });
      this.chatGateway.handleEmitNewMessage(newMessage);
      return res.status(200).json(newMessage);
    } catch (error) {
      
      return res.status(500).json(error);
    }
  }

  async toggleMuteUser(res: Response, userId: number, dto: ToggleMuteUser & Conversation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          AND: [
            { id: dto.id },
            { type: "GROUP" },
            { active: true },
            { members: { some: { userid: userId, isadmin: true, active: true } } },
            { members: { some: { userid: dto.userId, active: true } } },
          ],
        },
      });
      if (!conversation) return res.status(404).json({ message: "conversation or member not found" });
      const update = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: {
          members: {
            update: {
              where: { conversationid_userid: { conversationid: dto.id, userid: dto.userId } },
              data: { mute: dto.mute, endmute: dto.endmute || new Date() },
            },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      return res.status(200).json(update);
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async toggleBanUser(res: Response, userId: number, dto: ToggleBanUser & Conversation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          AND: [
            { id: dto.id },
            { type: "GROUP" },
            { active: true },
            { members: { some: { userid: userId, isadmin: true, active: true } } },
            { members: { some: { userid: dto.userId, active: true } } },
          ],
        },
      });
      if (!conversation) return res.status(404).json({ message: "conversation or member not found" });
      const update = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: {
          members: {
            update: {
              where: { conversationid_userid: { userid: dto.userId, conversationid: dto.id } },
              data: { ban: dto.ban, endban: dto.endban || new Date() },
            },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleRemoveSocketIdFromRoom(dto.userId, conversation.id);
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      return res.status(200).json(update);
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async leaveConversation(res: Response, userId: number, dto: LeaveConvesation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: { id: dto.id, members: { some: { userid: userId, active: true } } },
        include: { members: { where: { userid: userId, active: true } } },
      });
      if (!conversation || !conversation.active || !conversation.members.length)
        return res.status(400).json({ message: "conversation not found" });
      var isActive = conversation.type === "GROUP" ? true : false;
      if (conversation.type === "GROUP" && conversation.members[0].isadmin) {
        const admins = await this.prismaService.members.findMany({
          where: { conversationid: dto.id, isadmin: true, active: true },
        });
        // ?set new admin
        if (admins.length === 1) {
          const newAdmin = await this.prismaService.members.findFirst({
            where: { conversationid: dto.id, active: true, ban: false, mute: false, userid: { not: userId } },
            orderBy: { created_at: "asc" },
          });
          if (newAdmin) {
            await this.prismaService.members.update({
              where: { id: newAdmin.id },
              data: { isadmin: true },
            });
          } else {
            const newAdmin = await this.prismaService.members.findFirst({
              where: { conversationid: dto.id, active: true, userid: { not: userId } },
              orderBy: { created_at: "asc" },
            });
            if (newAdmin) {
              await this.prismaService.members.update({
                where: { id: newAdmin.id },
                data: { isadmin: true, mute: false, ban: false, endban: new Date(), endmute: new Date() },
              });
            } else isActive = conversation.public ? true : false;
          }
        }
      }
      const update = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: {
          active: isActive,
          members: {
            update: {
              where: { conversationid_userid: { userid: userId, conversationid: dto.id } },
              data: { active: false, isadmin: false },
            },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      this.chatGateway.handleRemoveSocketIdFromRoom(userId, dto.id);
      return res.status(200).json({ message: "success leave conversation" });
    } catch (error) {
      
      return res.status(500).json({ message: "server error" });
    }
  }

  async deleteConversation(res: Response, userId: number, dto: Conversation) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: { id: dto.id, members: { some: { userid: userId, isadmin: true, active: true } } },
      });
      if (!conversation) return res.status(404).json({ message: "conversation not found" });
      const update = await this.prismaService.conversation.update({
        where: { id: dto.id },
        data: {
          active: false,
          members: {
            update: { where: { conversationid_userid: { conversationid: dto.id, userid: userId } }, data: { active: false } },
          },
        },
        include: { members: { include: { users: true } } },
      });
      this.chatGateway.handleEmitUpdateConversation(update, userId);
      return res.status(201).json({ message: "success deleted" });
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }
}
