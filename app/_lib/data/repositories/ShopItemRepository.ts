import { IShopItemRepository } from "../interfaces/IShopItemRepository";
import { ShopItem } from "@lib/data/entities";
import { db, shopItem } from "../../../../db";
import { eq } from "drizzle-orm";

export class ShopItemRepository implements IShopItemRepository {
    async createShopItem(shopItemData: ShopItem): Promise<ShopItem> {
        // Insert the new ShopItem into the database
        const [createdShopItem] = await db
            .insert(shopItem)
            .values(shopItemData)
            .returning();
        return createdShopItem; // Returns the created ShopItem object
    }

    async getShopItemById(id: number): Promise<ShopItem> {
        const foundShopItem = await db
            .select()
            .from(shopItem)
            .where(eq(shopItem.id, id));

        if (foundShopItem.length === 0) {
            throw new Error("ShopItem not found");
        }
        return foundShopItem[0]; // Returns the found ShopItem object
    }

    async getShopItemsByOrganizationId(
        organizationId: string,
    ): Promise<ShopItem[]> {
        const foundShopItems = await db
            .select()
            .from(shopItem)
            .where(eq(shopItem.organizationId, organizationId));

        return foundShopItems; // Returns an array of ShopItems
    }

    async updateShopItem(shopItemData: ShopItem): Promise<ShopItem> {
        const updatedShopItem = await db
            .update(shopItem)
            .set({
                name: shopItemData.name,
                description: shopItemData.description,
                stock: shopItemData.stock,
                organizationId: shopItemData.organizationId,
            })
            .where(eq(shopItem.id, shopItemData.id))
            .returning();

        if (updatedShopItem.length === 0) {
            throw new Error("ShopItem not found for update");
        }
        return updatedShopItem[0]; // Returns the updated ShopItem object
    }

    async deleteShopItem(id: number): Promise<boolean> {
        const deletedShopItem = await db
            .delete(shopItem)
            .where(eq(shopItem.id, id));

        return deletedShopItem.count > 0; // Returns true if the ShopItem was successfully deleted, else false
    }
}
