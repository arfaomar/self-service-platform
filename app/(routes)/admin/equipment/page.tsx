import { auth } from "@clerk/nextjs/server";
import { shopItemCategoryRepository, shopItemRepository } from "@lib/data/repositories";
import EquipmentTable from "@components/admin/EquipmentTable";

export default async function ManageCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItems =
        await shopItemRepository.getAllShopItemsInOrganization(orgId);

    const categories = await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(orgId);

    return <EquipmentTable shopItems={shopItems} categories={categories}/>;
}
