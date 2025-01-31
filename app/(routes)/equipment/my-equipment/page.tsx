import { auth } from "@clerk/nextjs/server";
import MyEquipmentTable from "@components/equipment/MyEquipmentTable";
import { inventoryRepository, shopItemRepository } from "@lib/data/repositories";
import { MyEquipmentTableProp } from "@components/equipment/MyEquipmentTable";

export default async function MyEquipmentPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const myInventory = await inventoryRepository.getInventoryByOwnerId(userId);
    const shopItems = await shopItemRepository.getAllShopItemsInOrganization(orgId);

    const myEquipmentTableProps : MyEquipmentTableProp[] = [];
    myInventory.map((myItem) => {
        const item = shopItems.find((item) => item.id === myItem.itemId);
        const equipmentProp: MyEquipmentTableProp = {
            imageUrl: item?.url || "",
            name: item?.name || "",
            description: item?.description || "",
            purchaseDate: myItem.purchaseDate,
        };
        myEquipmentTableProps.push(equipmentProp);
    });

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                My Equipment
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {myInventory.length > 0 ? (
                    <MyEquipmentTable equipmentProps={myEquipmentTableProps} />
                ) : (
                    <div className={"text-center"}>
                        <h1 className={"text-muted-foreground m-16"}>
                            No equipment found
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}
