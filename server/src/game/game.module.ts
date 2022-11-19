import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [NotificationsModule, AchievementsModule],
  controllers: [GameController],
  providers: [GameService, GameGateway]
})
export class GameModule {}
