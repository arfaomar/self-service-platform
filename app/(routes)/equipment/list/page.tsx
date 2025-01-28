import { auth } from "@clerk/nextjs/server";
import EquipmentAllTable from "@components/equipment/EquipmentAllTable";
import { inventoryRepository, ticketRepository } from "@lib/data/repositories";
import { Inventory, Ticket } from "@lib/data/entities";

export type EquipmentListProps = {
    userId: string;
    items: Inventory[];
    issues?: Ticket[];
};

export default async function EquipmentListPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    console.log("userId", userId);
    console.log("orgId", orgId);

    const inventories = await inventoryRepository.getAllInventories();
    const equipmentLists : EquipmentListProps[] = [];

    for (const inventory of inventories) {
        const ownerId = inventory.ownerId;
        if (equipmentLists.some((e) => e.userId === ownerId)) {
            equipmentLists.find((e) => e.userId === ownerId)?.items.push(inventory);
            continue;
        }
        const issues = await ticketRepository.getTicketsByUserId(ownerId, orgId);
        equipmentLists.push({ userId: ownerId, items: [inventory], issues });
    }

    return <EquipmentAllTable inventories={equipmentLists} />;
}
