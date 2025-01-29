import { auth } from "@clerk/nextjs/server";
import AddEquipmentForm from "@components/admin/AddEquipmentForm";
import { shopItemCategoryRepository } from "@lib/data/repositories";

export default async function AddEquipmentPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const categories = await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(orgId);


    return (
        <AddEquipmentForm categories={categories}  />
    );
}
