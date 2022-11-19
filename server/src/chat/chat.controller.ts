import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { isEmpty } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('')
  @UseGuards(JwtAuthGuard)
  async getChats(@Req() req: any) {
    const page = req.query.page ? req.query.page - 1 : 0;
    const size = req.query.size ? req.query.size : 0;
    return this.chatService.getUserChats({
      skip: Number(page),
      take: Number(size),
      //   cursor: {},
      where: {
        group_member: {
          some: {
            user_id: Number(req.user.sub),
          },
        },
      },
      include: { group_member: true },
    });
  }

  //TODO: complet chat create
  @Post('/dmchat')
  @UseGuards(JwtAuthGuard)
  async getConversation(@Req() req: any) {
    const conversation = await this.chatService.messages({
      where: {
        AND: [
          {
            group_member: {
              some: {
                user_id: Number(req.user.sub),
              },
            },
          },
          {
            group_member: {
              some: {
                user_id: Number(req.body.user_id),
              },
            },
          },
        ],
      },
    });
    if (conversation === null) {
      return { id: -1 };
    }
    return conversation;
  }

  @Post('/message')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Req() req: any) {
    if (Number(req.body.conversation_id) === -1) {
      return await this.chatService.createConversation({
  // group_member: {
  //   connect: [{ users: { connect: { intra_id: Number(req.user.sub) } } }],
  // },
  message: {
    create: {
      content: req.body.content,
      users: { connect: { intra_id: Number(req.user.sub) } },
    },
  },
  name: ''
});
    }
    // return await this.chatService.createMessage({
    //   content: req.body.content,
    //   users: { connect: { intra_id: Number(req.user.sub) } },
    //   conversation: { connect: { id: req.body.conversation_id } },
    // });
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async getChatsMessages(@Req() req: any) {
    // return data;
    const page = req.query.page ? req.query.page - 1 : 0;
    const size = req.query.size ? req.query.size : 0;
    return this.chatService.getChatMessages({
      //   cursor: {},
      skip: Number(page),
      take: Number(size),
      where: {
        conversation_id: Number(req.params.id),
      },
    });
  }
}
