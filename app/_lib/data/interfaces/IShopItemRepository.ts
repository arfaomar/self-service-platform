import { ShopItem } from "@lib/data/entities";

export interface IShopItemRepository {
    createShopItem(shopItem: ShopItem): Promise<ShopItem>;
    getShopItemById(id: number): Promise<ShopItem>;
    getShopItemsByOrganizationId(organizationId: string): Promise<ShopItem[]>;
    updateShopItem(shopItem: ShopItem): Promise<ShopItem>;
    deleteShopItem(id: number): Promise<boolean>;
}
