import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtTwoFactorGuard } from "src/auth/jwt-two-factor.guard";
import { acceptRequestBody, blockRequestBody, friendRequestBody, unfriendRequestBody } from "../interfaces/user.interface";
import { FriendsService } from "./friends.service";

@Controller("friends")
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    // Handle all requests to /friends

    /*
     ** Send new Friend Request
     ** @param {string} senderId
     ** @param {string} receiverId
     ** @return {object} response
     */
    @Post("sendrequest")
    @UseGuards(JwtTwoFactorGuard)
    sendRequest(@Body() dto: friendRequestBody, @Req() req: Request, @Res() res: Response) {
        return this.friendsService.sendRequest(dto, Number(req.user.sub), res);
    }

    /*
     ** Get all Invites
     ** @param {string} id
     ** @return {object} response
     */
    @Get("invites")
    @UseGuards(JwtTwoFactorGuard)
    getInvites(@Req() req: Request, @Res() res: Response) {
        return this.friendsService.getInvites(Number(req.user.sub), res);
    }

    /*
     ** Accept Friend Request
     ** @param {string} id
     ** @return {object} response
     */
    @Post("acceptrequest")
    @UseGuards(JwtTwoFactorGuard)
    acceptRequest(@Req() req: Request, @Res() res: Response, @Body() dto: acceptRequestBody) {
        return this.friendsService.acceptRequest(dto, Number(req.user.sub), res);
    }

    /*
     ** Reject Friend Request
     ** @param {string} id
     ** @return {object} response
     */
    @Post("rejectrequest")
    @UseGuards(JwtTwoFactorGuard)
    rejectRequest(@Req() req: Request, @Res() res: Response, @Body() dto: acceptRequestBody) {
        return this.friendsService.rejectRequest(dto, Number(req.user.sub), res);
    }

    /*
     ** Unfriend a friend
     ** @param {string} id
     ** @return {object} response
     */
    @Post("unfriend")
    @UseGuards(JwtTwoFactorGuard)
    unfriend(@Body() dto: unfriendRequestBody, @Res() res: Response) {
        return this.friendsService.unfriend(dto, res);
    }

    /*
     ** Get all Friends
     ** @return {object} response
     */
    @Get("")
    @UseGuards(JwtTwoFactorGuard)
    getFriends(@Req() req: Request, @Res() res: Response) {
        return this.friendsService.getFriends(req, res);
    }

    /*
     ** Block a Friend
     ** @param {string} id
     ** @return {object} response
     */
    @Post("blockfriend")
    @UseGuards(JwtTwoFactorGuard)
    blockFriend(@Req() req: Request, @Res() res: Response, @Body() dto: blockRequestBody) {
        return this.friendsService.blockFriend(dto, req, res);
    }

    /*
     ** get friends bu username
     ** @param {string} username
     ** @return {object} response
     */
    @Get("user/:username")
    @UseGuards(JwtTwoFactorGuard)
    getFriendsByUsername(@Req() req: Request, @Res() res: Response) {
        return this.friendsService.getFriendsByUsername(req, res);
    }

    /*
     ** get blocked users
     ** @return {object} response
     */

    @Get("blocked")
    @UseGuards(JwtTwoFactorGuard)
    getBlockedUsers(@Req() req: Request, @Res() res: Response) {
        return this.friendsService.getBlockedUsers(req, res);
    }

    /*
     ** unblock a user
     ** @param {string} id
     ** @return {object} response
     */
    @Post("unblock")
    @UseGuards(JwtTwoFactorGuard)
    unblockUser(@Req() req: Request, @Res() res: Response, @Body() dto: blockRequestBody) {
        return this.friendsService.unblockUser(dto, req, res);
    }

    /*
     ** To do
     ** get friends by username √
     ** get blocked users √
     ** unfriend route √
     ** unblock route √
     */
}
