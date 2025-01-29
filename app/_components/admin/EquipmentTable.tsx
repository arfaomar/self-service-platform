"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table";
import { useRouter } from "next/navigation";
import { ShopItem, ShopItemCategory } from "@lib/data/entities";


interface EquipmentTableProps {
    shopItems: ShopItem[];
    categories: ShopItemCategory[];
}

export default function EquipmentTable({ shopItems, categories } : EquipmentTableProps) {

    const router = useRouter();

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                Manage Categories
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"w-1/12"}>ID</TableHead>
                            <TableHead className={"w-1/12"}>Name</TableHead>
                            <TableHead className={"w-1/12"}>Description</TableHead>
                            <TableHead className={"w-1/12"}>Image</TableHead>
                            <TableHead className={"w-1/12"}>Category</TableHead>
                            <TableHead className={"w-1/12"}>Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shopItems.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    onClick={() => router.push(`/admin/equipment/${item.id}`)}
                                    className="cursor-pointer"
                                >
                                    <TableCell className={"py-4"}>{item.id}</TableCell>
                                    <TableCell className={"py-4"}>{item.name}</TableCell>
                                    <TableCell className={"py-4"}>{item.description}</TableCell>
                                    <TableCell className={"py-4"}>BILD</TableCell>
                                    <TableCell className={"py-4"}>
                                        {categories.find((category) => category.id === item.categoryId)?.name}
                                    </TableCell>
                                    <TableCell className={"py-4"}>{item.stock}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
        ;
}