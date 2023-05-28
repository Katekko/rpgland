import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../core/factories/service.factory";
import { verifyPlayerisStartedMiddleware } from "../../../core/middlewares/verify_player_is_started.middleware";
import { PlayerModel } from '../../../core/models/player.model';
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";

export class StartCommand extends Command {
    constructor() {
        super(false);
    }

    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            await super.execute(message, args);
            const playerStarted = await verifyPlayerisStartedMiddleware(message);
            const playerService = ServiceFactory.makePlayersService();
            const contact = await message.getContact();
            const name = contact.pushname;
            const telephone = contact.number;
            const player = PlayerModel.createNew(name, telephone);

            try {
                if (!playerStarted) {
                    await playerService.savePlayer(player);
                    message.reply(this.translate.commands.start.welcome(player.name));
                } else {
                    message.reply(this.translate.commands.start.playerAlreadyStarted);
                }
            } catch (err) {
                console.error('Error adding player:', err);
                message.reply(this.translate.commands.start.error);
            }
        }
    }
}
