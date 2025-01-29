import { auth } from "@clerk/nextjs/server";
import { shopItemCategoryRepository, shopItemRepository } from "@lib/data/repositories";
import EditEquipmentForm from "@components/admin/EditEquipmentForm";

export default async function AddEquipmentPage({params} : {params: {equipmentId: string}}) {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const equipmentId = (await params).equipmentId;
    const shopItem = await shopItemRepository.getShopItemById(parseInt(equipmentId));
    const categories = await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(orgId);

    return (
        <EditEquipmentForm categories={categories} shopItem={shopItem}/>
    );
}
