import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import config from './helpers/config';
import { JwtStategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { FriendsService } from './friends/friends.service';
import { AchievementsService } from './achivements/achivements.service';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { FriendsModule } from './friends/friends.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
    UsersModule,
    PrismaModule,
    FriendsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ChatModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStategy,
    FriendsService,
    AchievementsService,
    ChatService,
  ],
})
export class AppModule {}
