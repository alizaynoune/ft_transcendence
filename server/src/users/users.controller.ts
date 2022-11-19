import { Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Req() req: any, @Res() res: Response) {
    // console.log(req.body);
    const user = await this.usersService.updateUser({
      data: req.body,
      where: { intra_id: req.user.sub },
    });
    return res.status(201).json(user)
  }
  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async findUser(@Param('username') username: string) {
    return this.usersService.user({ username: username });
  }
}
