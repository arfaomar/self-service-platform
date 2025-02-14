"use server";

import { auth } from "@clerk/nextjs/server";
import {
    shopItemCategoryRepository,
    shopItemRepository,
} from "@lib/data/repositories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import { Input } from "@components/ui/Input";
import ShopItemCard from "@components/equipment/shop/ShopItemCard";
import EquipmentShopContextProvider from "@contexts/EquipmentShopContext";

import ShoppingCartContent from "@components/equipment/shop/ShoppingCartContent";

export default async function EquipmentShopPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItemCategories =
        await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(
            orgId,
        );
    const shopItems =
        await shopItemRepository.getAllShopItemsInOrganization(orgId);

    const defaultCategory =
        shopItemCategories.length > 0 ? shopItemCategories[0].name : "default";

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                Equipment Shop
            </h1>
            <EquipmentShopContextProvider>
                <Tabs
                    defaultValue={defaultCategory}
                    className="mx-auto my-10 container"
                >
                    <div className={"flex justify-between"}>
                        <TabsList className={"bg-card mb-4"}>
                            {shopItemCategories.length > 0 ? (
                                shopItemCategories.map((shopItemCategory) => (
                                    <TabsTrigger
                                        key={shopItemCategory.id}
                                        value={shopItemCategory.name}
                                    >
                                        {shopItemCategory.name}
                                    </TabsTrigger>
                                ))
                            ) : (
                                <TabsTrigger
                                    value="default"
                                    className={"text-black"}
                                >
                                    No Categories
                                </TabsTrigger>
                            )}
                        </TabsList>
                        <div className={"flex items-center"}>
                            <Input
                                placeholder="Search for items..."
                                type="text"
                                className={"w-96 mr-4"}
                            />


                                <ShoppingCartContent />

                        </div>
                    </div>
                    {shopItemCategories.length > 0 ? (
                        shopItemCategories.map((shopItemCategory) =>
                            shopItems.length > 0 ? (
                                <TabsContent
                                    key={shopItemCategory.id}
                                    value={shopItemCategory.name}
                                    className={"grid grid-cols-6"}
                                >
                                    {shopItems.map((shopItem) =>
                                        shopItem.categoryId ===
                                        shopItemCategory.id ? (
                                            <ShopItemCard
                                                key={shopItem.id}
                                                shopItem={shopItem}
                                            />
                                        ) : null,
                                    )}
                                </TabsContent>
                            ) : (
                                <TabsContent
                                    key={shopItemCategory.id}
                                    value={shopItemCategory.name}
                                    className={
                                        "w-full h-96 text-center content-center"
                                    }
                                >
                                    <span
                                        className={
                                            "text-xl text-muted-foreground"
                                        }
                                    >
                                        No Items Found
                                    </span>
                                </TabsContent>
                            ),
                        )
                    ) : shopItems.length > 0 ? (
                        <TabsContent
                            value={"default"}
                            className={"grid grid-cols-6"}
                        >
                            {shopItems.map((shopItem) => (
                                <ShopItemCard
                                    key={shopItem.id}
                                    shopItem={shopItem}
                                />
                            ))}
                        </TabsContent>
                    ) : (
                        <TabsContent
                            value={"default"}
                            className={"w-full h-96 text-center content-center"}
                        >
                            <span className={"text-xl text-muted-foreground"}>
                                No Items Found
                            </span>
                        </TabsContent>
                    )}
                </Tabs>
            </EquipmentShopContextProvider>
        </section>
    );
}
