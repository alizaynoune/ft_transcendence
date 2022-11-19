import { Controller, Get, Param, Put, Req, Res, Query, UseGuards, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";
import { GetUserQuery } from "src/interfaces/user.interface";
import { FileFieldsInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { JwtTwoFactorGuard } from "src/auth/jwt-two-factor.guard";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Put("update")
    @UseGuards(JwtTwoFactorGuard)
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "avatar", maxCount: 1 },
                { name: "cover", maxCount: 1 },
            ],
            {
                fileFilter: function (req, file, cb) {
                    if (/^image\/(webp|svg|png|gif|jpe?g|jfif|bmp|dpg|ico)$/i.test(file.mimetype)) cb(null, true);
                    else cb(null, false);
                },
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        const uploadPath = process.env.UPLOAD_LOCATION;
                        if (!existsSync(uploadPath)) {
                            mkdirSync(uploadPath);
                        }
                        cb(null, uploadPath);
                    },
                    filename: (req, file, cb) => {
                        const filesName = `${file.fieldname}_${req.user.sub}.${file.originalname.split(".").at(-1)}`;
                        cb(null, filesName);
                    },
                }),
            }
        )
    )
    async updateUser(
        @Req() req: Request,
        @Res() res: Response,
        @UploadedFiles()
        files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] }
    ) {
        let data = req.body;
        if (files) {
            const { avatar, cover } = files;
            if (avatar) data.img_url = `${process.env.PUBLIC_URL}/users/image/${avatar[0].filename}`;
            if (cover) data.cover = `${process.env.PUBLIC_URL}/users/image/${cover[0].filename}`;
        }
        return this.usersService.updateUser(req, res, { data });
    }
    @Get("/image/:fileName")
    serveAvatar(@Param("fileName") fileName: string, @Res() res: Response) {
        res.sendFile(fileName, { root: "upload" });
    }
    @Get("all")
    @UseGuards(JwtTwoFactorGuard)
    async getAllUsers(@Req() req: Request, @Query() query: GetUserQuery, @Res() res: Response) {
        return this.usersService.getAllUsers(req.user.sub, query, res);
    }
    @Get(":username")
    @UseGuards(JwtTwoFactorGuard)
    async findUser(@Param("username") username: string) {
        if (/^(\d)+$/.test(username)) return this.usersService.user({ intra_id: Number(username) });
        else return this.usersService.user({ username: username });
    }
}
