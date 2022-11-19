import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { FortyTwoAuthGuard } from "./fortyTwo-auth.guard";
import { JwtTwoFactorGuard } from "./jwt-two-factor.guard";
import { UsersService } from "src/users/users.service";
import { TwoFactorAuthentication } from "src/interfaces/user.interface";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post("/login")
    @UseGuards(FortyTwoAuthGuard)
    async Auth() {}
    @Get("/42/callback")
    @UseGuards(FortyTwoAuthGuard)
    async Callback(@Req() req: Request, @Res() res: Response) {
        return await this.authService.authenticate(req, res);
    }

    @Get("/me")
    @UseGuards(JwtTwoFactorGuard)
    async Login(@Req() req: Request, @Res() res: Response) {
        return await this.authService.authMe(req.user.sub, res);
    }
    @Post("2fa/generate")
    @UseGuards(JwtTwoFactorGuard)
    async generateTwoFa(@Req() req: Request, @Res() res: Response) {
        return this.authService.generateTwoFactorAuthenticationSecret(res, req.user.sub);
    }

    @Post("2fa/validate")
    @UseGuards(JwtAuthGuard)
    async validateTwoFa(@Req() req: Request, @Res() res: Response, @Body() dto: TwoFactorAuthentication) {
        try {
            const user = await this.userService.user({ intra_id: req.user.sub });
            const isValid = await this.authService.verifyTwoFaCode(dto.code, user.two_factor_secret);
            if (!isValid) return res.status(401).json({ message: "Invalid authentication code" });
            const token = await this.authService.getAccessToken({ sub: user.intra_id, tow_factor_validate: true });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: "server error" });
        }
    }

    @Post("2fa/disable")
    @UseGuards(JwtTwoFactorGuard)
    async disableTwoFa(@Req() req: Request, @Res() res: Response) {
        await this.userService.disableTwoFactorAuthentication(req.user.sub);
        return res.status(201).json({ message: "success disabled 2fat" });
    }
}
