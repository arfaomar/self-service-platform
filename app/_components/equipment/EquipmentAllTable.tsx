import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import { Inventory, ShopItem } from "@lib/data/entities";
import { Skeleton } from "@components/ui/Skeleton";
import { fetchUserData } from "@lib/utils";
import Image from "next/image";

export default async function EquipmentAllTable({
    inventories,
    shopItems,
}: {
    inventories: Inventory[];
    shopItems: ShopItem[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className={"w-1/12"}></TableHead>
                    <TableHead className={"w-2/12"}>Item Name</TableHead>
                    <TableHead className={"w-2/12"}>Name</TableHead>
                    <TableHead className={"w-2/12"}>Purchase Date</TableHead>
                    <TableHead className={"w-2/12"}>Update Date</TableHead>
                    <TableHead className={"w-1/12"}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventories.map(async (inventory) => {
                    const shopItem = shopItems.find(
                        (shopItem) => shopItem.id === inventory.itemId,
                    );
                    const userData = await fetchUserData(inventory.ownerId);
                    return (
                        <TableRow key={inventory.id}>
                            <TableCell className={"w-1/12"}>
                                {shopItem?.url ? (
                                    <Image
                                        src={shopItem.url}
                                        alt={shopItem.name}
                                        className={
                                            "rounded-lg w-16 h-16  bg-background text-center content-center"
                                        }
                                        width={64}
                                        height={64}
                                    />
                                ) : (
                                    <Skeleton className="rounded-lg w-16 h-16  bg-background text-center content-center">
                                        <div>No Image</div>
                                    </Skeleton>
                                )}
                            </TableCell>
                            <TableCell className={"w-1/12"}>
                                {shopItem?.name}
                            </TableCell>
                            <TableCell className={"w-2/12"}>
                                {userData.first_name} {userData.last_name}
                            </TableCell>
                            <TableCell className={"w-2/12"}>
                                {inventory.purchaseDate.toLocaleDateString()}
                            </TableCell>
                            <TableCell className={"w-1/12"}>
                                {inventory.updateDate
                                    ? inventory.updateDate.toLocaleDateString()
                                    : "-"}
                            </TableCell>
                            <TableCell>
                                {inventory.status ? inventory.status : "OK"}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
