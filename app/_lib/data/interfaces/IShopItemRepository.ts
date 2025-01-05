import { ShopItem, CreatedShopItem, UpdatedShopItem } from "@lib/data/entities";

export interface IShopItemRepository {
    createShopItem(shopItem: CreatedShopItem): Promise<ShopItem>;
    getShopItemById(id: number): Promise<ShopItem>;
    getAllShopItemsInOrganization(organizationId: string): Promise<ShopItem[]>;
    updateShopItem(shopItem: UpdatedShopItem): Promise<ShopItem>;
    deleteShopItem(id: number): Promise<void>;
}
