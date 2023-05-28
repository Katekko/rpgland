import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../core/factories/service.factory";

export class RankingCommand extends Command {
    constructor() {
        super(false);
    }

    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            const playerService = ServiceFactory.makePlayersService();
            const players = await playerService.getAllPlayers();
            players.sort((a, b) => b.level - a.level);
            const chat = await message.getChat();
            chat.sendMessage(this.translate.commands.ranking.leaderboard(players));
        } catch (err) {
            throw err;
        }
    }
}