import { auth } from "@clerk/nextjs/server";
import { itemInRequestRepository, requestRepository } from "@lib/data/repositories";
import MyRequestsTable, { MyRequestsTableProps } from "@components/equipment/my-requests/MyRequestsTable";

export default async function MyRequestsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    console.log(userId, orgId);

    const myRequests = await requestRepository.getAllRequestsByUserId(userId, orgId);
    const requestsWithItems: MyRequestsTableProps[] = [];
    for (const request of myRequests) {
        const items = await itemInRequestRepository.getItemsInRequestList(request.id);
        requestsWithItems.push({ request, items });
    }

    return (
        <MyRequestsTable requests={requestsWithItems}/>
    );
}
