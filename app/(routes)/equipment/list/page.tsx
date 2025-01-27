import { auth } from "@clerk/nextjs/server";
import {
    Table, TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@components/ui/Table";
import { shopItemCategoryRepository, shopItemRepository } from "@lib/data/repositories";
import Image from "next/image";
import { Skeleton } from "@components/ui/Skeleton";
import Link from "next/link";

export default async function EquipmentListPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItems = await shopItemRepository.getAllShopItemsInOrganization(orgId);

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>Equipment List</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"w-1/12"}>Image</TableHead>
                            <TableHead className={"w-2/12"}>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className={"w-1/12"}>Category</TableHead>
                            <TableHead className={"w-1/12"}>Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            await Promise.all(shopItems.map(async (item) => {
                                const category = item.categoryId ? await shopItemCategoryRepository.getShopItemCategoryById(item.categoryId) : null;
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className={"flex flex-row text-center w-fit"}>{}
                                            {item.url ? (
                                                <Link
                                                    href={item.url}
                                                    target="_blank"
                                                    rel=""
                                                >
                                                    <Image src={item.url}
                                                           alt={item.name}
                                                           height={128}
                                                           width={128}
                                                           className={"rounded-lg w-24 h-24 object-cover"}
                                                    />
                                                </Link>
                                            ) : (
                                                <Skeleton className="rounded-lg w-24 h-24  bg-background text-center content-center">
                                                    <div>No Image</div>
                                                </Skeleton>
                                            )
                                            }
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{category ? category.name : "No Category"}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                    </TableRow>
                                );
                            }))
                        }
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
