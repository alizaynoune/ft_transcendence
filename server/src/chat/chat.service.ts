import { Injectable } from '@nestjs/common';
import { conversation, group_member, message, Prisma } from '@prisma/client';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createConversation(
    data: Prisma.conversationCreateInput,
  ): Promise<conversation> {
    try {
      return this.prisma.conversation.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async conversation(params: {
    where?: Prisma.conversationWhereUniqueInput;
  }): Promise<conversation | null> {
    const { where } = params;
    try {
      return this.prisma.conversation.findUnique({
        where,
      });
    } catch (error) {
      return error;
    }
  }

  async messages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.conversationWhereUniqueInput;
    where?: Prisma.conversationWhereInput;
    include?: Prisma.conversationInclude;
    orderBy?: Prisma.conversationOrderByWithRelationInput;
  }): Promise<conversation> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return this.prisma.conversation.findFirst({
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

  async getUserChats(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.conversationWhereUniqueInput;
    where?: Prisma.conversationWhereInput;
    include?: Prisma.conversationInclude;
    orderBy?: Prisma.conversationOrderByWithRelationInput;
  }): Promise<conversation[]> {
    const { skip, take, cursor, where, include, orderBy } = params;
    try {
      return this.prisma.conversation.findMany({
        skip,
        take,
        cursor,
        where,
        include,
        orderBy,
      });
    } catch (error) {
      return error;
    }
  }

  async getChatMessages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.messageWhereUniqueInput;
    where?: Prisma.messageWhereInput;
    orderBy?: Prisma.messageOrderByWithRelationInput;
  }): Promise<message[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return this.prisma.message.findMany({
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
  async createMessage(data): Promise<message> {
    try {
      return this.prisma.message.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }
}
