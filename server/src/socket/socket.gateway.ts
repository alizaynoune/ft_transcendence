import { WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Logger, UnauthorizedException } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private prismaService: PrismaService) {}

    @WebSocketServer()
    private server: Server;
    private users: { intra_id: number; socketId: string }[] = [];
    private logger: Logger = new Logger("AppGateway");

    /**
     * handle after init socket
     * @param server
     */
    afterInit(server: Server) {
        this.logger.log("AppGateway init");
    }

    /**
     * handle socket connection
     * @param client
     * @param args
     * @returns
     */
    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const userIndex = this.users.findIndex((u) => u.intra_id === client.user);
            if (userIndex > -1) {
                this.server.in(this.users[userIndex].socketId).disconnectSockets();
                this.users[userIndex].socketId = client.id;
            } else this.users.push({ intra_id: client.user, socketId: client.id });
            await client.join("online");
            await this.prismaService.users.update({
                where: { intra_id: client.user },
                data: { status: "ONLINE" },
            });
        } catch (error) {
            return this.disconnect(client);
        }
    }

    /**
     * handle socket disconnect
     * @param client
     */
    async handleDisconnect(client: Socket) {
        const userIndex = this.users.findIndex((u) => u.socketId === client.id);
        if (userIndex > -1) {
            const { intra_id } = this.users[userIndex];
            await this.prismaService.users.update({
                where: { intra_id },
                data: { status: "OFFLINE" },
            });
            this.users.splice(userIndex, 1);
            this.server.to("online").emit("userChangeStatus", { intra_id, status: "OFFLINE" });
        }
    }

    /**
     * disconnnet socket client
     * @param socket
     */
    private disconnect(socket: Socket) {
        socket.emit("error", new UnauthorizedException());
        socket.disconnect();
    }

    getSocketIdFromUserId(userId: number) {
        return this.users.find((u) => u.intra_id === userId)?.socketId;
    }
}
