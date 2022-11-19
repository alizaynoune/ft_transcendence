import { Test, TestingModule } from '@nestjs/testing';
import { AchievementsController } from './achievements.controller';

describe('AchievementsController', () => {
  let controller: AchievementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementsController],
    }).compile();

    controller = module.get<AchievementsController>(AchievementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
