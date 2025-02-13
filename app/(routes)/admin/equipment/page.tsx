"use server";

import { auth } from "@clerk/nextjs/server";
import {
    shopItemCategoryRepository,
    shopItemRepository,
} from "@lib/data/repositories";
import EquipmentTable from "@components/admin/EquipmentTable";
import PageSection from "@components/general/PageSection";

export default async function ManageCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItems =
        await shopItemRepository.getAllShopItemsInOrganization(orgId);

    const categories =
        await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(
            orgId,
        );

    return (
        <PageSection
            title={"Manage Equipment"}
            contentLength={shopItems.length}
        >
            <EquipmentTable shopItems={shopItems} categories={categories} />
        </PageSection>
    );
}
