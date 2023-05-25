import { ItemType } from "../enums/item_type.enum";
import { ItemModel } from "../models/item.model";

export class ItemFactory {
    private itemsList: ItemModel[] = [
        ItemFactory.makeCoin(),
    ];

    static makeCoin(): ItemModel {
        return new ItemModel('7c0cd60e-0fc2-4dc7-88bf-bacbfbbbd6e1', 'Coin', 1, 0.5, 5, ItemType.Currency, 1);
    }

    static makeHealthPotion(): ItemModel {
        return new ItemModel('872bad70-f696-4de5-a552-c16f132cb4d3', 'Health Potion', 5, 0.2, 2, ItemType.Consumible, 2);
    }

    static makeItemByType(type: ItemType): ItemModel {
        switch (type) {
            case ItemType.Currency:
                return this.makeCoin();
            case ItemType.Consumible:
                return this.makeHealthPotion();
            default:
                throw Error('Invalid item type');
        }
    }

    static makeItemsToShop(): ItemModel[] {
        return [this.makeHealthPotion()];
    }
} 