import { Controller, Req, Res, Get, UseGuards, Param, Put } from "@nestjs/common";
import { Response, Request } from "express";
import { JwtTwoFactorGuard } from "src/auth/jwt-two-factor.guard";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get("/:username?")
  @UseGuards(JwtTwoFactorGuard)
  getProfile(@Req() req: Request, @Res() res: Response, @Param("username") username: string) {
    return this.profileService.profile(req, res, username);
  }
}
