import { auth } from "@clerk/nextjs/server";
import EditCategoryForm from "@components/admin/EditCategoryForm";
import { shopItemCategoryRepository } from "@lib/data/repositories";

export default async function EditCategoryPage({params} : {params: {categoryId: string}}) {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const categoryId = (await params).categoryId;
    const category = await shopItemCategoryRepository.getShopItemCategoryById(parseInt(categoryId));


    return (

      <EditCategoryForm category={category} />
    );
}
