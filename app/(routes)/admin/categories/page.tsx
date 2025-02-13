"use server";

import { auth } from "@clerk/nextjs/server";
import { shopItemCategoryRepository } from "@lib/data/repositories";
import CategoriesTable from "@components/admin/CategoriesTable";
import PageSection from "@components/general/PageSection";

export default async function ManageCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const shopItemCategories =
        await shopItemCategoryRepository.getAllShopItemCategoriesInOrganization(
            orgId,
        );

    return (
        <PageSection
            title={"Manage Categories"}
            contentLength={shopItemCategories.length}
        >
            <CategoriesTable shopItemCategories={shopItemCategories} />
        </PageSection>
    );
}
