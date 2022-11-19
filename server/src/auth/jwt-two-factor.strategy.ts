import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtTwoFaStrategy extends PassportStrategy(Strategy, "jwt-two-factor") {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      
      
      const user = await this.usersService.user({ intra_id: payload.sub });
      if (!user.two_factor_activate) return payload;
      if (payload.tow_factor_validate) return payload;
    } catch (error) {
      
    }
  }
}
