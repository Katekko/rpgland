import { MobModel } from "../core/models/mob.model";
import { translationEn } from "./en";

export type CommandTranslations = {
    commands: {
        help: {
            title: string,
            start: string,
            hunt: string,
            heal: string,
            shop: string
        },
        start: {
            welcome: (name: string) => string,
            error: string,
            playerAlreadyStarted: string,
        },
        commons: {
            needToStart: string
        },
        hunt: {
            find: {
                found: (mob: MobModel) => string,
                failedToSearch: string,
            }
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) => string,
                attacked: (mobName: string, damage: number, remainingHealth: number) => string,
                defeated: (mobName: string) => string,
                mobDefeated: (mobName: string, exp: number) => string,
                failedToAttack: string,
            }
        }
    };
};

export function i18n(): CommandTranslations {
    // based in a variable somewhere will decide if will be english or portugues (or something else)
    // <default english>
    return translationEn;
}