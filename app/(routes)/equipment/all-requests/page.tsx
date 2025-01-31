"use server";

import { auth } from "@clerk/nextjs/server";
import { itemInRequestRepository, requestRepository } from "@lib/data/repositories";
import AllRequestsTable, { AllRequestsTableProp } from "@components/equipment/requests/AllRequestsTable";
import { fetchUserData } from "@lib/utils";

export default async function AllRequestsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const requests = await requestRepository.getAllRequestsInOrganization(orgId);
    const itemsInRequests = await itemInRequestRepository.getAllRequestsForOrganization(orgId);

    const allRequestsTableProps : AllRequestsTableProp[] = [];
    requests.map(async (request) => {
        const userData = await fetchUserData(request.userId);
        const items = itemsInRequests.filter((item) => item.requestId === request.id);
        const requestProp: AllRequestsTableProp = {
            requestId: request.id,
            userImageUrl: userData?.image_url || "",
            userFullName: (userData?.first_name + " " + userData?.last_name) || "Unknown",
            creationDate: request.creationDate.toLocaleDateString(),
            updateDate: request.updateDate?.toLocaleDateString() || "-",
            status: request.status,
            requestedItemsAmount: items.length,
            acceptedItemsAmount: items.filter((item) => item.status === "Accepted").length,
            declinedItemsAmount: items.filter((item) => item.status === "Declined").length,
        };
        allRequestsTableProps.push(requestProp);
    });

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                All Requests
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {requests.length > 0 ? (
                    <AllRequestsTable requestProps={allRequestsTableProps} />
                ) : (
                    <div className={"text-center"}>
                        <h1 className={"text-muted-foreground m-16"}>
                            No requests found
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}