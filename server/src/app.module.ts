import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import config from "./helpers/config";
import { JwtStategy } from "./auth/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { FriendsService } from "./friends/friends.service";
import { ChatModule } from "./chat/chat.module";
import { FriendsModule } from "./friends/friends.module";
import { ProfileModule } from "./profile/profile.module";
import { GameModule } from "./game/game.module";
import { AchievementsModule } from "./achievements/achievements.module";
import { AuthService } from "./auth/auth.service";
import { NotificationsModule } from "./notifications/notifications.module";
import { NotificationsGateway } from "./notifications/notifications.gateway";
import { PrismaService } from "./prisma/prisma.service";
import { AchievementsService } from "./achievements/achievements.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    AuthModule,
    UsersModule,
    FriendsModule,
    JwtModule,
    ChatModule,
    ProfileModule,
    GameModule,
    NotificationsModule,
    AchievementsModule,
  ],
  controllers: [AppController],
  providers: [AuthService, PrismaService, AppService, JwtStategy, FriendsService, AchievementsService, NotificationsGateway],
})
export class AppModule {}
