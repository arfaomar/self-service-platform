"use server";

import { auth } from "@clerk/nextjs/server";
import AddCategoriesForm from "@components/admin/AddCategoriesForm";

export default async function AddCategoriesPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    return <AddCategoriesForm />;
}
