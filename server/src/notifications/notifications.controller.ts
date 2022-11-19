import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTwoFactorGuard } from 'src/auth/jwt-two-factor.guard';
import { NotificationsService } from './notifications.service';


@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService){}
  @Get('/get')
  @UseGuards(JwtTwoFactorGuard)
  getNotifications(@Req() req: Request, @Res() res: Response){
    return this.notificationsService.getNotifications(req, res)
  }
}
