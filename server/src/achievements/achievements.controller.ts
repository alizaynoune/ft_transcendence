import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTwoFactorGuard } from 'src/auth/jwt-two-factor.guard';
import {AchievementsService} from './achievements.service'

@Controller('achievements')
export class AchievementsController {
  constructor(private achievements:  AchievementsService){}

  @Get('')
  @UseGuards(JwtTwoFactorGuard)
  getAchievements(@Req() req: Request, @Res() res: Response){
    return this.achievements.getAllAchievements(req, res)
  }
  @Get('test')
  @UseGuards(JwtTwoFactorGuard)
  async test(@Req() req: Request, @Res() res: Response){
    const matches = await this.achievements.sharpshooter(req.user.sub)
    return res.status(200).json(matches)
  }
}
