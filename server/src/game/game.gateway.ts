import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";
import { AchievementsService } from "src/achievements/achievements.service";

@WebSocketGateway()
export class GameGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;
    private racquetSize: number = 3;

    constructor(private prismaService: PrismaService, private achievements: AchievementsService) {}
    /**
     * handle socket desconnect
     * @param client
     */
    async handleDisconnect(client: Socket) {
        try {
            const game = await this.prismaService.game.findFirst({
                where: {
                    AND: [{ players: { some: { userid: client.user } } }, { status: "PLAYING" }, { started: true }],
                },
            });
            if (game) {
                const endGame = await this.prismaService.game.update({
                    where: { id: game.id },
                    data: { status: "END", started: false },
                    include: {
                        players: { include: { users: true }, orderBy: { id: "asc" } },
                    },
                });
                await this.achievements.gameAchievemets(endGame.players[0].userid);
                await this.achievements.gameAchievemets(endGame.players[1].userid);
                // change players status
                await this.prismaService.users.updateMany({
                    where: {
                        AND: [
                            { status: "PLAYING" },
                            { OR: [{ intra_id: endGame.players[0].userid }, { intra_id: endGame.players[1].userid }] },
                        ],
                    },
                    data: { status: "ONLINE" },
                });
                //todo emit players status update
                this.server.to([endGame.id.toString(), `player${endGame.id.toString()}`]).emit("updateGame", endGame);
            }
        } catch (error) {}
    }

    @SubscribeMessage("joinWatcher")
    async joinWatcher(client: Socket, payload: { gameId: number }) {
        const gameIdTostring = payload.gameId.toString();
        await client.join(gameIdTostring);
        this.server.in([gameIdTostring, `player${gameIdTostring}`]).emit("countWatchers", {
            total: this.server.sockets.adapter.rooms.get(gameIdTostring)?.size || 0,
        });
    }

    @SubscribeMessage("leaveWatcher")
    async leaveWatcher(client: Socket, payload: { gameId: number }) {
        const gameIdTostring = payload.gameId.toString();

        await client.leave(gameIdTostring);
        this.server.in([gameIdTostring, `player${gameIdTostring}`]).emit("countWatchers", {
            total: this.server.sockets.adapter.rooms.get(gameIdTostring)?.size || 0,
        });
    }

    async userStartGame(userId_1: number, userId_2: number) {
        try {
            await this.prismaService.users.updateMany({
                where: { OR: [{ intra_id: userId_1 }, { intra_id: userId_2 }] },
                data: { status: "PLAYING" },
            });
            this.server.to("online").emit("userStartGame", { userId_1 });
            this.server.to("online").emit("userStartGame", { userId_2 });
        } catch (error) {}
    }

    @SubscribeMessage("playerReady")
    async playerReady(client: Socket, payload: { gameId: number }) {
        try {
            await this.prismaService.players.updateMany({
                where: { AND: [{ userid: client.user }, { gameid: payload.gameId }] },
                data: { ready: true },
            });
            let game = await this.prismaService.game.findFirst({
                where: { AND: [{ id: payload.gameId }, { NOT: { status: "END" } }] },
                include: {
                    players: { include: { users: true }, orderBy: { id: "asc" } },
                },
            });
            if (game) {
                if (game.players[0].ready && game.players[1].ready) {
                    game = await this.prismaService.game.update({
                        where: { id: payload.gameId },
                        data: { status: "PLAYING" },
                        include: {
                            players: { include: { users: true }, orderBy: { id: "asc" } },
                        },
                    });
                }

                await client.join(`player${game.id.toString()}`);
                this.server.in(`player${game.id.toString()}`).emit("updateGame", game);
            }
        } catch (error) {}
    }

    @SubscribeMessage("streamGame")
    playeGame(client: Socket, payload: { gameId: number }) {
        client.to(`player${payload.gameId.toString()}`).emit("playeGame");
    }

    @SubscribeMessage("startGame")
    async startGame(client: Socket, payload: { gameId: number }) {
        try {
            const existGame = await this.prismaService.game.findFirst({
                where: {
                    AND: [
                        { id: payload.gameId },
                        { players: { some: { userid: client.user } } },
                        { NOT: { status: "END" } },
                        { started: false },
                    ],
                },
            });
            if (existGame) {
                const game = await this.prismaService.game.update({
                    where: { id: existGame.id },
                    data: { started: true, created_at: new Date(), updated_at: new Date() },
                    include: {
                        players: { include: { users: true }, orderBy: { id: "asc" } },
                    },
                });
                this.server.in([payload.gameId.toString(), `player${payload.gameId.toString()}`]).emit("updateGame", game);
                this.server.in([payload.gameId.toString(), `player${payload.gameId.toString()}`]).emit("ballPosition", {
                    ballPosition: { x: 0, y: 0 },
                    currentStep: { x: 0, y: 1 },
                });
            }
        } catch (error) {}
    }

    @SubscribeMessage("ballRacquetPosition")
    ballRacquetPosition(
        client: Socket,
        payload: {
            ballPosition: { x: number; y: number };
            currentStep: { x: number; y: number };
            racquetPosition: { x: number; y: number };
            gameId: number;
        }
    ) {
        const { ballPosition, currentStep, racquetPosition, gameId } = payload;

        client.in([`player${gameId.toString()}`, gameId.toString()]).emit("ballPosition", { ballPosition, currentStep });
        client.in([`player${gameId.toString()}`, gameId.toString()]).emit("racquetPosition", { racquetPosition });
    }

    EmitGameEnd(game: any) {
        const gameId = game.id.toString();
        this.server.in([gameId, `player${gameId}`]).emit("updateGame", game);
        this.server.in([gameId, `player${gameId}`]).socketsLeave([gameId, `player${gameId}`]);
    }

    @SubscribeMessage("raquetMove")
    async raquetMove(client: Socket, payload: { racquet: number; gameId: number; playerIndex: number }) {
        const { racquet, gameId, playerIndex } = payload;
        this.server.in([gameId.toString(), `player${gameId.toString()}`]).emit("raquetMove", { racquet, playerIndex });
    }

    @SubscribeMessage("gameCalculation")
    async gameCalculation(client: Socket, payload: any) {
        const racquetHalf = this.racquetSize / 2;
        const { ballPosition, racquetPosition, gameId } = payload;

        if (ballPosition.x >= racquetPosition.x - racquetHalf && ballPosition.x <= racquetPosition.x + racquetHalf) {
            let stepX = ((racquetPosition.x - racquetHalf + (racquetPosition.x + racquetHalf)) / 2 - ballPosition.x) / 10;
            this.server.in([`player${gameId.toString()}`, gameId.toString()]).emit("ballPosition", {
                ballPosition,
                currentStep: { x: stepX, y: -1 },
            });
        } else {
            try {
                // incremet fighter score
                const game = await this.prismaService.game.update({
                    where: { id: gameId },
                    data: {
                        players: {
                            updateMany: {
                                where: { userid: { not: client.user } },
                                data: { score: { increment: 1 } },
                            },
                        },
                    },
                    include: {
                        players: { include: { users: true }, orderBy: { id: "asc" } },
                    },
                });
                // find fighter id
                const userId = game.players.find((p) => p.userid !== client.user).userid;
                // count increment xp
                const IncrementXp = game.level === "EASY" ? 3 : game.level === "NORMAL" ? 8 : 20;

                await this.prismaService.users.update({
                    where: { intra_id: userId },
                    data: { xp: { increment: IncrementXp } },
                });
                // end game
                if (game.players[0].score === 10 || game.players[1].score === 10) {
                    const endGame = await this.prismaService.game.update({
                        where: { id: game.id },
                        data: { started: false, status: "END" },
                        include: {
                            players: { include: { users: true }, orderBy: { id: "asc" } },
                        },
                    });
                    await this.prismaService.users.updateMany({
                        where: { OR: [{ intra_id: endGame.players[0].userid }, { intra_id: endGame.players[1].userid }] },
                        data: { status: "ONLINE" },
                    });
                    await this.achievements.gameAchievemets(endGame.players[0].userid);
                    await this.achievements.gameAchievemets(endGame.players[1].userid);
                    // emit end game
                    this.server.in([gameId, `player${gameId}`]).emit("updateGame", endGame);
                } else {
                    //emit rest ball position
                    this.server.in([`player${gameId.toString()}`, gameId.toString()]).emit("ballPosition", {
                        ballPosition: { x: 0, y: 0 },
                        currentStep: { x: 0, y: 1 },
                    });
                }
                //emit now score
                this.server.in([`player${gameId.toString()}`, gameId.toString()]).emit("updateScore", game.players);
            } catch (error) {}
        }
    }
}
