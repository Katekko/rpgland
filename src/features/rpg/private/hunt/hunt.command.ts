import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { MobModel } from "../../../../core/models/mob.model";

export class HuntCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            const mobService = ServiceFactory.makeMobsService();
            const playerService = ServiceFactory.makePlayersService();

            const player = await playerService.getPlayerByMessage(message);
            if (player) {
                if (player.state != PlayerState.Idle) {
                    message.reply(this.translate.commands.hunt.find.failedToSearch);
                    return;
                }
                const mobs = await mobService.getAllMobs();
                const totalChance = mobs.reduce((sum, mob) => sum + mob.chanceToAppear, 0);
                let randomChance = Math.random() * totalChance;

                let selectedMob: MobModel | undefined;

                for (const mob of mobs) {
                    const chance = mob.chanceToAppear / totalChance;
                    if (randomChance <= chance) {
                        selectedMob = mob;
                        break;
                    }
                    randomChance -= chance;
                }

                if (selectedMob) {
                    player!.state = PlayerState.Hunting;
                    player!.huntAgainst = selectedMob;
                    playerService.savePlayer(player);
                    message.reply(this.translate.commands.hunt.find.found(selectedMob));
                }
            } else {
                message.reply(this.translate.commands.commons.needToStart);
            }
        } catch (err) {
            // apply log here
            console.log(err);
        }
    }
}
