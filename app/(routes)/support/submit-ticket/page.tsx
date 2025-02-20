"use server";
import SubmitTicketForm from "@components/support/SubmitTicketForm";
import {
    inventoryRepository,
    shopItemRepository,
} from "@lib/data/repositories";
import { auth } from "@clerk/nextjs/server";
import { ShopItem } from "@lib/data/entities";

export default async function SubmitTicketPage() {
    const { userId } = await auth();
    let myInventories = null;
    if (userId) {
        myInventories = await inventoryRepository.getInventoryByOwnerId(userId);
    }
    let shopItems: ShopItem[] = [];
    if (myInventories) {
        for (const inventory of myInventories) {
            const items = await shopItemRepository.getShopItemById(
                inventory.itemId,
            );
            if (shopItems.find((item) => item.id === items.id)) {
                continue;
            }
            shopItems = [...shopItems, items];
        }
    }

    return <SubmitTicketForm items={shopItems} />;
}
