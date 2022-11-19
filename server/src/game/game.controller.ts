import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTwoFactorGuard } from 'src/auth/jwt-two-factor.guard';
import { GameService } from './game.service';
import {
  RegisterToQueueBody,
  LeaveGameBody,
  CreateGameBody,
  InvitePlayGame,
  AcceptePlayGame,
  RejectPlayGame,
  GetGameQuery,
} from 'src/interfaces/user.interface';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('/')
  @UseGuards(JwtTwoFactorGuard)
  getGameById(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: GetGameQuery,
  ) {
    return this.gameService.getGame(req, res, query);
  }

  @Get('/history')
  @UseGuards(JwtTwoFactorGuard)
  getUserGame(@Req() req: Request, @Res() res: Response) {
    return this.gameService.getUserHistoryGame(req, res);
  }
  @Get('current')
  @UseGuards(JwtTwoFactorGuard)
  getCurrentGames(@Req() req: Request, @Res() res: Response) {
    return this.gameService.getCurrentGames(Number(req.query.cursor) || 1, res);
  }

  @Post('registerqueue')
  @UseGuards(JwtTwoFactorGuard)
  registerQueue(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: RegisterToQueueBody,
  ) {
    return this.gameService.registerToQueue(req, res, dto);
  }

  @Post('creategame')
  @UseGuards(JwtTwoFactorGuard)
  createGame(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: CreateGameBody,
  ) {
    return this.gameService.createGame(req, res, dto);
  }

  @Delete('leavequeue')
  @UseGuards(JwtTwoFactorGuard)
  leaveQueue(@Req() req: Request, @Res() res: Response) {
    return this.gameService.leaveQueue(req, res);
  }

  @Put('leaveGame')
  @UseGuards(JwtTwoFactorGuard)
  leaveGame(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: LeaveGameBody,
  ) {
    return this.gameService.leaveGame(req, res, dto);
  }
  @Post('invite')
  @UseGuards(JwtTwoFactorGuard)
  inviteToPlayGame(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: InvitePlayGame,
  ) {
    return this.gameService.inviteUserToGame(req, res, dto);
  }
  @Put('invite/accepte')
  @UseGuards(JwtTwoFactorGuard)
  accepteInvite(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: AcceptePlayGame,
  ) {
    return this.gameService.accepteGame(req, res, dto);
  }

  @Delete('invite/reject')
  @UseGuards(JwtTwoFactorGuard)
  rejecteInvite(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: RejectPlayGame,
  ) {
    return this.gameService.rejectGame(req, res, dto);
  }
}
