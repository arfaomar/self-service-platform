"use server";

import { auth } from "@clerk/nextjs/server";
import EquipmentAllTable from "@components/equipment/EquipmentAllTable";
import {
    inventoryRepository,
    shopItemRepository,
} from "@lib/data/repositories";
import { Inventory, Ticket } from "@lib/data/entities";
import PageSection from "@components/general/PageSection";

export type AllEquipmentProps = {
    userId: string;
    items: Inventory[];
    issues?: Ticket[];
};

export default async function AllEquipmentPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const inventories = await inventoryRepository.getAllInventories();
    const shopItems =
        await shopItemRepository.getAllShopItemsInOrganization(orgId);

    return (
        <PageSection title={"All Equipment"} contentLength={inventories.length}>
            <EquipmentAllTable
                inventories={inventories}
                shopItems={shopItems}
            />
        </PageSection>
    );
}
