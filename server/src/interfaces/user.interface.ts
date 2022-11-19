import { Exclude, Type } from "class-transformer";
import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsDate,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength,
    ValidateIf,
} from "class-validator";
// import { Response as Res, Request as Req } from 'express';

// Global Interface declare
export {};
declare global {
    namespace Express {
        interface Request {
            user: {
                sub: number;
            };
        }
    }
}

// inject user in Socket interface
declare module "socket.io" {
    interface Socket {
        user: number;
    }
}

export interface User {
    id: number;
    intra_id: string;
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    verified: boolean;
    img_url: string;
    achievements: number;
    group_member: Array<number>;
}

// Frineds Type
export interface Friends {
    id: number;
    sender_id: number;
    receiver_id: number;
    accepted: string;
    created_at: string;
    updated_at: string;
}

/****************** Pagination DTO ******************/
export class PaginationDTO {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    cursor: number;
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    pageSize: number;
}

/****************** Pagination DTO ******************/

/*************** Users DTO **************/
export class GetUserQuery extends PaginationDTO {
    @IsString()
    @IsOptional()
    findBy: string;
}

export class TwoFactorAuthentication {
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/)
    @MaxLength(6)
    @MinLength(6)
    code: string;
}

/*************** Users DTO **************/

/************ Profile DTO **************/
export class GetUserParam {
    @IsString()
    id: string;
}

/************ Profile DTO **************/

/***********    Friends & Friends Requests    ***********/
//sendRequest DTO
export class friendRequestBody {
    @IsString()
    @IsNotEmpty()
    id: string;
}
export class acceptRequestBody {
    @IsString()
    @IsNotEmpty()
    id: string;
}

// Unfriend DTO
export class unfriendRequestBody {
    @IsString()
    @IsNotEmpty()
    id: string;
}

// Block User DTO
export class blockRequestBody {
    @IsString()
    @IsNotEmpty()
    id: string;
}
/***********    Friends & Friends Requests    ***********/

/************** QUEUE Interface ***********************/
// queue interface
export interface QueueInterface {
    GameLevel: "EASY" | "NORMAL" | "DIFFICULT";
    users: number[];
}

// register to queue dto
export class RegisterToQueueBody {
    @IsNotEmpty()
    @IsIn(["EASY", "NORMAL", "DIFFICULT"])
    gameLevel: "EASY" | "NORMAL" | "DIFFICULT";
}

/************** QUEUE Interface ***********************/

/*************** Game Interface ***********************/
// invite user to play game
export class InvitePlayGame {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
    @IsNotEmpty()
    @IsIn(["EASY", "NORMAL", "DIFFICULT"])
    gameLevel: "EASY" | "NORMAL" | "DIFFICULT";
}

// accepte game invite
export class AcceptePlayGame {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    inviteId: number;
}

// reject game invite
export class RejectPlayGame {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    inviteId: number;
}

// create game dto
export class CreateGameBody extends InvitePlayGame {}

// leave game dto
export class LeaveGameBody {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    gameId: number;
}

export class GetGameQuery {
    @IsNotEmpty()
    @Matches(/^\d+$/)
    gameId: string;
}

/*************** Game Interface ***********************/

/******************** Notifcations ********************/
// get notifications
export class GetNotifcaions {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
}

// socket read notifications
export class ReadNotification {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;
}

/******************** Notifcations ********************/

/******************* CHAT ****************************/
// Param
export class Conversation {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;
}

export class GetConversation {
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class CreateConversation {
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    @Min(1, { each: true })
    @Type(() => Number)
    members: number[];
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    title: string;
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(20)
    password: string;
    @IsNotEmpty()
    @IsBoolean()
    public: boolean;
    @IsNotEmpty()
    @IsIn(["DIRECT", "GROUP"])
    type: "DIRECT" | "GROUP";
    @IsOptional()
    @IsString()
    @MaxLength(80)
    message: string;
}

export class MessageDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    message: string;
}

export class GetMessages extends PaginationDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    id: number;
}

export class LeaveConvesation {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;
}

export class DeleteConversation {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    id: number;
}

export class ToggleMuteUser {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
    @IsNotEmpty()
    @IsBoolean()
    mute: boolean;
    @IsOptional()
    @IsDate({
        message: `minimal allowed date for endmute is current date + 10min (Coordinated Universal Time),endmute must be a Date instance`,
    })
    @ValidateIf((d) => !(new Date(d.endmute).getTime() > new Date().getTime()))
    endmute: Date;
}

export class ToggleBanUser {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
    @IsNotEmpty()
    @IsBoolean()
    ban: boolean;
    @IsOptional()
    @IsDate({
        message: `minimal allowed date for banend is current date (Coordinated Universal Time),endmute must be a Date instance`,
    })
    @ValidateIf((d) => !(new Date(d.endban).getTime() > new Date().getTime()))
    endban: Date;
}

export class JoinConversation {
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class ToggleAdmin {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    userId: number;
    @IsNotEmpty()
    @IsBoolean()
    setAs: boolean;
}

export class ConversationDataReturn {
    @Exclude()
    password: string;
}

export class ConversationUpdate {
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(20)
    password: string;
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Min(1, { each: true })
    @Type(() => Number)
    members: number[];
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    title: string;
    @IsOptional()
    @IsBoolean()
    protected: boolean;
    @IsOptional()
    @IsBoolean()
    public: boolean;
}

export class Search extends PaginationDTO {
    @IsString()
    @IsOptional()
    title: string;
}

/******************* CHAT ****************************/
