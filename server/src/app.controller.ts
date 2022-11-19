import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtTwoFactorGuard } from "./auth/jwt-two-factor.guard";

@Controller()
export class AppController {
    constructor() {}
    @UseGuards(JwtTwoFactorGuard)
    @Get("")
    gethello() {
        return "hello bitch";
    }
}
