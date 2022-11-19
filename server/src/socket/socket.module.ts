import { Global, Module } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { SocketGateway } from "./socket.gateway";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtService } from "@nestjs/jwt";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [PrismaModule, AuthModule, UsersModule, JwtModule],
  providers: [JwtService, AuthService, PrismaService, SocketService, SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
