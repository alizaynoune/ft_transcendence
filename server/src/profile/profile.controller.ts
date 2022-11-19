import { Controller, Req, Res, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response, Request } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private appService: ProfileService) {}
  @Get('/:username?')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request, @Res() res: Response, @Param() params: any) {
    // return req.user;
    return this.appService.profile(req, res, params);
  }
}
