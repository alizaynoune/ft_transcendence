import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [NotificationsModule, AchievementsModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
