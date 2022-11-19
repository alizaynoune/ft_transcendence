import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { pick } from "lodash";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";

@Injectable()
export class AuthService {
    constructor(private UserService: UsersService, private jwtService: JwtService) {}
    async authenticate(req: any, res: Response) {
        if (!req.user) {
            return "";
        }
        const intra_id = Number(req.user.id);
        const email = req.user.emails[0].value;
        const first_name = req.user.name.givenName;
        const last_name = req.user.name.familyName;
        const username = req.user.username;
        const img_url = req.user.photos[0].value;
        const user = await this.UserService.user({
            intra_id,
        });
        if (!user) {
            try {
                const newUser = await this.UserService.createUser({
                    intra_id,
                    email,
                    username,
                    first_name,
                    last_name,
                    img_url,
                });
                const payload = {
                    sub: newUser.intra_id,
                    tow_factor_validate: !newUser.two_factor_activate,
                };

                const token = await this.getAccessToken(payload);
                return res.redirect(`${process.env.FRONT_END_URL}/?token=${token}`);
            } catch (error) {
                return res.status(500).json({ message: "server error" });
            }
        }
        const payload = {
            sub: user.intra_id,
            tow_factor_validate: !user.two_factor_activate,
        };
        const token = await this.getAccessToken(payload);
        return res.redirect(`${process.env.FRONT_END_URL}/?token=${token}&tow_factor_activate=${user.two_factor_activate}`);
    }
    // get auth profile
    async authMe(intra_id: number, res: Response) {
        try {
            const data = await this.UserService.user({ intra_id });
            if (!data) return res.status(404).json({ message: "user not found" });
            const ret = pick(data, [
                "id",
                "intra_id",
                "username",
                "email",
                "first_name",
                "last_name",
                "img_url",
                "created_at",
                "updated_at",
            ]);
            return res.status(200).json(ret);
        } catch (error) {
            return res.status(400).json({
                message: error,
            });
        }
    }

    async getAccessToken(payload: any) {
        return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
    }

    async verifyAccessToken(jwt: string): Promise<any> {
        return await this.jwtService.verifyAsync(jwt, { secret: process.env.JWT_SECRET });
    }

    async generateTwoFactorAuthenticationSecret(res: Response, userId: number) {
        try {
            const user = await this.UserService.user({ intra_id: userId });
            if (!user) return res.status(404).json({ message: "user not found" });
            const secret = authenticator.generateSecret();
            const otpauthUrl = authenticator.keyuri(user.username, process.env.APP_NAME, secret);
            await this.UserService.setTwoFactorAuthenticationSecret(userId, secret);
            const url = await toDataURL(otpauthUrl);
            return res.send(url);
        } catch (error) {
            return res.status(500).json({ message: "server error" });
        }
    }

    async verifyTwoFaCode(code: string, secret: string) {
        return authenticator.verify({
            token: code,
            secret,
        });
    }
}
