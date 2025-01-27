import { auth } from "@clerk/nextjs/server";
import { shopItemCategoryRepository } from "@lib/data/repositories";
import EditCategoriesDialog from "@components/admin/EditCategoriesDialog";

export default async function ManageCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItemCategories =
        await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(
            orgId,
        );

    return <EditCategoriesDialog shopItemCategories={shopItemCategories} />;
}
