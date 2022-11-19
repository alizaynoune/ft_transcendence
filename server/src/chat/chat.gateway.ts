import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { SocketGateway } from "src/socket/socket.gateway";
import { UsePipes } from "@nestjs/common";
import { WSValidationPipe } from "src/socket/handleErrors";
import { Conversation } from "src/interfaces/user.interface";
import { members, message, conversation } from "@prisma/client";

@WebSocketGateway()
export class ChatGateway {
    constructor(private socketGateway: SocketGateway) {}
    @WebSocketServer()
    private server: Server;
    handleMemberJoinRoomChat(userId: number, conversationId: number) {
        const socketId = this.socketGateway.getSocketIdFromUserId(userId);
        if (socketId) this.server.in(socketId).socketsJoin(`chatRoom_${conversationId}`);
    }

    handleUserInRoom(userId: number, conversationId: number) {
        return new Promise((resolve, reject) => {
            const socketId = this.socketGateway.getSocketIdFromUserId(userId);
            if (!socketId) return reject({ message: "unauthorized" });
            if (!this.server.sockets.adapter.socketRooms(socketId).has(`chatRoom_${conversationId}`))
                return reject({ message: "unauthorized" });
            return resolve(socketId);
        });
    }

    handleEmitNewMessage(message: message) {
        const socketId = this.socketGateway.getSocketIdFromUserId(message.senderid);
        this.server.to(`chatRoom_${message.conversationid}`).except(socketId).emit("newMessage", message);
    }

    handleEmitUpdateConversation(update: conversation & { members: members[] }, userId: number) {
        const socketId = this.socketGateway.getSocketIdFromUserId(userId);
        const ids = update.members
            .map((m) => m.active && this.socketGateway.getSocketIdFromUserId(m.userid))
            .filter((i) => i !== undefined);

        this.server.to(ids).except(socketId).emit("updateConversation", update);
    }

    handleRemoveSocketIdFromRoom(userId: number, conversationId: number) {
        const socketId = this.socketGateway.getSocketIdFromUserId(userId);
        if (socketId) this.server.in(socketId).socketsLeave(`chatRoom_${conversationId}`);
    }

    handlePasswordChanged(userId: number, conversationId: number) {
        const socketId = this.socketGateway.getSocketIdFromUserId(userId);
        this.server.in(`chatRoom_${conversationId}`).except(socketId).emit("passwordChanged", conversationId);
        this.server.in(`chatRoom_${conversationId}`).except(socketId).socketsLeave(`chatRoom_${conversationId}`);
    }

    @UsePipes(WSValidationPipe)
    @SubscribeMessage("leaveChatRoom")
    async handleLeftCahtRoom(client: Socket, dto: Conversation) {
        try {
            await client.leave(`chatRoom_${dto.id}`);
        } catch (error) {
            throw new WsException(error);
        }
    }
}
