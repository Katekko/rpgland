import { ItemType } from "../core/enums/item_type.enum";
import { ItemModel } from "../core/models/item.model";
import { MobModel } from "../core/models/mob.model";
import { PlayerModel } from "../core/models/player.model";
import { CommandTranslations } from "./translation";

const commandChar = '--';

function _createProfileBox(profile: string): string {
    const width = 20; // Width of the box
    const horizontalLine = '─'.repeat(width); // Horizontal line for the box

    const boxTop = `╭${horizontalLine}╮\n`; // Top line of the box
    const boxBottom = `\n╰${horizontalLine}╯`; // Bottom line of the box

    const emptyLine = `${' '.repeat(width)}`; // Empty line with matching width

    return `${boxTop}${emptyLine}\n\t${profile}\n${emptyLine}${boxBottom}`;
}

export const translationPtBR: CommandTranslations = {
    commands: {
        help: {
            title: "🌍 *Bem-vindo ao mundo de RPG Land!* 🌍\n```Embarque em uma jornada épica, conquiste áreas desafiadoras e torne-se um aventureiro lendário.\nVeja como jogar:```",
            start: `🎮 *START*   -> \`\`\`Comece sua aventura em RPG Land! Use este comando para iniciar sua jornada e explorar o vasto mundo repleto de desafios, tesouros e missões épicas.\n🌟 \*${commandChar}start\*\`\`\``,
            hunt: `🏹 *HUNT*   -> \`\`\`Aventure-se na natureza selvagem para caçar criaturas perigosas e ganhar EXP e moedas.\n🕵️‍♂️ \*${commandChar}hunt find\*\n⚔️ \*${commandChar}hunt attack\*\`\`\``,
            heal: `🩹 *HEAL*   -> \`\`\`Consuma uma poção de vida para restaurar seus pontos de vida (HP) ❤️ quando estiverem baixos.\n🍷 \*${commandChar}heal <amount | 1> \*\`\`\``,
            shop: `🛍️ *SHOP*   -> \`\`\`Visite o mercado para gastar suas moedas suadas em vários itens, equipamentos e aprimoramentos.\n🛒 *${commandChar}shop info*\n💰 \*${commandChar}shop buy <item name> <amount>\*\`\`\``,
            profile: `🧍 *PROFILE*   -> \`\`\`Verifique o perfil e as estatísticas de seu jogador.\n📊 \*${commandChar}profile\*\`\`\``,
            ranking: `🏆 *RANKING*   -> \`\`\`Verifique a Ranking para ver os melhores jogadores por nível.\n👑 \*${commandChar}ranking\*\`\`\``
        },
        start: {
            welcome: (name: string) => `🌍 Bem-vindo ao mundo de RPG Land, *${name}*! 🌍\nEmbarque em uma jornada épica, conquiste áreas desafiadoras e torne-se um aventureiro lendário. ⚔️🛡️\n\n🕵️‍♂️ Para encontrar mobs, use o comando: *${commandChar}hunt find*\n⚔️ Para atacar um mob, use o comando: *${commandChar}hunt attack*`,
            error: '❌ Falha no início de sua jornada ',
            playerAlreadyStarted: '❌ Ops! Parece que você já está no jogo.'
        },
        commons: {
            needToStart: `⚠️ Você precisa começar sua jornada primeiro\nEnvie: *${commandChar}start*`,
            somethingWrong: '❌❌❌ Algo está errado, entre em contato com a Katekko ❌❌❌',
            waitMessage: '⏳ Aguarde um momento antes de enviar outra mensagem.',
            notAuthorized: '❌ Você não está autorizado a usar este bot. ❌\nEntre em contato com o administrador para obter acesso.\n*Katekko#1429* ',
            botMaintenance: "*🛠️ O bot está passando por manutenção no momento. 🛠️\nTente novamente mais tarde.*",
            commandOnlyForPrivate: '❌ Esse comando só pode ser usado em bate-papos privados. ❌',
            youAreNotKatekko: '❌ Você não é o katekko seu corno ❌'
        },
        hunt: {
            find: {
                found: (mob: MobModel) => `🏹 Prepare-se para a batalha! 🏹\nVocê encontrou um *${mob.name}* com *${mob.health}*❤️ de vida!`,
                failedToSearch: `⚠️ Você já está no modo de caça. Termine sua caçada atual antes de iniciar uma nova.`,
            },
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) => `⚔️ Você atacou o *${mob}* e causou *${damage}* de dano! ⚔️\nO *${mob}* tem *${remainingHealth}* ❤️ restantes.`,
                attacked: (mob: string, damage: number, remainingHealth: number) => `🔥 O *${mob}* atacou você e causou *${damage}*! Você tem *${remainingHealth}* ❤️ restantes.`,
                defeated: (mob: string) => `☠️ Você foi derrotado pelo *${mob}*! ☠️\nVocê perdeu um nível.`,
                mobDefeated: (mob: string, exp: number) => `💥 Você derrotou o *${mob}* e ganhou *${exp}* pontos de experiência!`,
                failedToAttack: `⚠️ No momento, você não está caçando nenhum mob. Use o comando *${commandChar}hunt find* para começar a caçar.`,
                levelUp: (level: number) => `🎉 Parabéns! 🎉\nVocê atingiu o nível *${level}*!`,
                itemFound: (item: ItemModel) => `🎉 Você encontrou ${item.amount} ${item.name}! 🎉`
            }
        },
        profile: (player: PlayerModel) => {
            const progressBarLength = 10;
            const filledBarCount = Math.floor((player.exp / player.getExpNeededForNextLevel()) * progressBarLength);
            const emptyBarCount = progressBarLength - filledBarCount;

            const filledBar = '▓'.repeat(filledBarCount);
            const emptyBar = '░'.repeat(emptyBarCount);

            const coinItem = player.inventory.find(item => item.type === ItemType.Currency);

            const potionCount = player.inventory.reduce((total, item) => {
                if (item.type === ItemType.HealthPotion) {
                    return total + item.amount;
                }
                return total;
            }, 0);
            return _createProfileBox(`\`\`\`${player.state.toString()}\`\`\`\n\t🧍 *${player.name}* > *Lv. ${player.level}*\n\t[${filledBar}${emptyBar}] (${player.exp}/${player.getExpNeededForNextLevel()})\n\n\t❤️ ${player.health}/${player.getMaxHealth()}   ⚔️ *${player.getMaxAttack()}   💰 ${coinItem?.amount ?? 0}   🍷 ${potionCount}*`);
        },
        shop: {
            info: (items: ItemModel[]) => {
                const itemLines = items.map(item => `🛒 *${item.name}* - Preço: *${item.price}* moedas`);
                const itemsInfo = itemLines.join('\n');
                const drawContinuousLine = (length: number): string => {
                    return "\u2500".repeat(length);
                };

                const continuousLine = drawContinuousLine(20);
                return `🏪 Bem-vindo à loja! 🛍️\n${continuousLine}\n${itemsInfo}\n${continuousLine}\nPara comprar um item, use o comando: *--shop buy <item name> <amount>*`;
            },
            itemNotFound: (itemName: string) => {
                return `⚠️ O item *'${itemName}'* não está disponível na loja.\nVerifique o nome do item e tente novamente.`;
            },
            missingArguments: `⚠️ Você precisa fornecer o nome do item e o valor que deseja comprar.\nUso: *--shop buy <item name> <amount>*`,
            insufficientCoins: (itemName: string) => `⚠️ Você não tem moedas suficientes para comprar *${itemName}*.`,
            buy: (item: ItemModel, amount: number, totalPrice: number) => {
                return `✅ Você adquiriu com sucesso 🛒*${amount} ${item.name}* por 💰*${totalPrice}* moedas!\nAproveite sua nova compra! 🎉`;
            },
            notIdle: "⚠️ Não é possível acessar a loja enquanto estiver em outra atividade.\nTermine sua tarefa atual antes de visitar a loja."
        },
        ranking: {
            leaderboard: (players: PlayerModel[]) => {
                const emojiPositions = ['🥇', '🥈', '🥉'];
                let leaderboardMessage = '🏆 Ranking - Melhores jogadores por nível 🏆\n\n';
                for (let i = 0; i < Math.min(players.length, 10); i++) {
                    const player = players[i];
                    const positionEmoji = i < 3 ? emojiPositions[i] : `#${i + 1}`;
                    leaderboardMessage += `${positionEmoji} ${player.name} - Level ${player.level}\n`;
                }
                return leaderboardMessage;
            }
        },
        heal: {
            healedWithItem: (healedAmount: number, currentHealth: number, itemName: string) => {
                return `🩹 Você regenerou *${healedAmount} HP* usando uma ${itemName}! 🎉\nAtualmente você possui ❤️*${currentHealth} HP*.`;
            },
            noPotion: "😰 Você não tem nenhuma *Poção de Cura restante*. Visite a loja ou continue caçando para obter mais.",
            failedToHeal: "⚠️ Você está ocupado e não pode se curar no momento. Termine sua atividade atual e tente novamente."
        },
        inventory: {
            emptyInventory: "🎒 Inventário 🎒\n\n📦 Seu inventário está vazio.",
            open: (player: PlayerModel) => {
                let inventoryMessage = "🎒 Inventário 🎒\n";
                const drawContinuousLine = (length: number): string => {
                    return "\u2500".repeat(length);
                };

                const continuousLine = drawContinuousLine(20);

                inventoryMessage += `${continuousLine}\n`;

                for (let i = 0; i < player.inventory.length; i++) {
                    const item = player.inventory[i];
                    inventoryMessage += `${i + 1}. ${item.name} - Quantidade: ${item.amount}\n`;
                }

                inventoryMessage += `${continuousLine}`;

                return inventoryMessage;
            }
        }
    }
};
