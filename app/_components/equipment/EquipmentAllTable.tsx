import {
    Table, TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@components/ui/Table";
import { EquipmentListProps } from "../../(routes)/equipment/list/page";

export default function EquipmentAllTable( inventories : { inventories: EquipmentListProps[] } ) {
    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                All Equipment
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <span className={"flex flex-row justify-evenly mb-2"}>
                    <p className={""}>
                        Owning Users: {inventories.inventories.length}
                    </p>
                    <p className={""}>
                        Total Items: {
                        inventories.inventories.reduce(
                            (acc, curr) => acc + curr.items.length,
                            0,
                        )}
                    </p>
                </span>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"w-1/12"}></TableHead>
                            <TableHead className={"w-2/12"}>ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className={"w-1/12"}>
                                Owned Items
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventories.inventories.map((inventory) => {
                            const items = inventory.items;
                            return (
                                <TableRow key={inventory.userId}>
                                    <TableCell>
                                        <div
                                            className={
                                                "w-16 h-16 object-cover rounded-lg bg-gray-400"
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{inventory.userId}</TableCell>
                                    <TableCell>No Name</TableCell>
                                    <TableCell>{items.length}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}