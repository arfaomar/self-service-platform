"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/Dialog";
import { ShopItemCategory } from "@lib/data/entities/ShopItemCategory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import EditCategoryForm from "@components/admin/EditCategoryForm";

function CreateArticleDialogForm() {
    return null;
}

interface EditCategoriesDialogProps {
    shopItemCategories: ShopItemCategory[];
}

export default function EditCategoriesDialog({ shopItemCategories } : EditCategoriesDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ShopItemCategory | null>(null);

    const handleEditCategory = (category: ShopItemCategory) => {
        setSelectedCategory(category);
        setOpen(true);
    }

    return (
        <>
            <section>
                <h1 className={"text-3xl font-semibold text-center"}>
                    Manage Categories
                </h1>
                <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"w-3/12"}>Name</TableHead>
                                <TableHead className={"w-2/12"}>
                                    Items in Category
                                </TableHead>
                                <TableHead className={"w-1/12"}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shopItemCategories.map((category) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            {category.organizationId}
                                        </TableCell>
                                        <TableCell
                                            className={
                                                "flex flex-row justify-between py-4 "
                                            }
                                        >
                                            <Button onClick={() => handleEditCategory(category)}></Button>
                                            <Link
                                                href={`/admin/categories/${category.id}`}
                                            >
                                                ( Edit )
                                            </Link>
                                            <Link
                                                href={`/admin/categories/${category.id}`}
                                            >
                                                ( Remove )
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </section>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        {
                           selectedCategory ?
                               <EditCategoryForm category={selectedCategory} />
                               : "No Category selected"
                        }
                    </DialogHeader>
                    <CreateArticleDialogForm />
                </DialogContent>
            </Dialog>
        </>
)
    ;
}