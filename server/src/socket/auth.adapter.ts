import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

export class AuthAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplicationContext,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {
    super(app);
  }
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, { ...options, cors: true });
    server.use(async (client: Socket, next: any) => {
      try {
        const decoded = await this.authService.verifyAccessToken(
          client.handshake.auth.token || client.handshake.headers.authorization
        );
        const user = await this.prismaService.users.findUnique({ where: { intra_id: decoded.sub } });
        if (!user) next(new Error("Authentication error"));
        client.user = user.intra_id;
        next();
      } catch (error) {
        next(new Error("Authentication error"));
      }
    });
    return server;
  }
}
