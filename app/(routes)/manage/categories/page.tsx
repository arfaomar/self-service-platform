import { auth } from "@clerk/nextjs/server";
import {
    Table, TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@components/ui/Table";
import { shopItemCategoryRepository } from "@lib/data/repositories";
import Link from "next/link";

export default async function ManageCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItemCategories = await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(orgId);

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>Manage Categories</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={"w-2/12"}>Name</TableHead>
                            <TableHead className={"w-5/12"}>Organization</TableHead>
                            <TableHead className={"w-1/12"}></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            shopItemCategories.map((category) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.organizationId}</TableCell>
                                        <TableCell className={"flex flex-row justify-between"}>
                                            <Link href={`/manage/categories/${category.id}`}>
                                                ( Edit )
                                            </Link>
                                            <Link href={`/manage/categories/${category.id}`}>
                                                ( Remove )
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
