import { auth } from "@clerk/nextjs/server";
import MyEquipmentTable from "@components/equipment/MyEquipmentTable";

export default async function MyEquipmentPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                My Equipment
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <MyEquipmentTable />
            </div>
        </section>
    );
}
