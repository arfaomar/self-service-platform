"use server";

import { auth } from "@clerk/nextjs/server";
import IndividualRequest from "@components/equipment/request/IndividualRequest";
import {
    itemInRequestRepository,
    requestRepository,
    shopItemRepository,
} from "@lib/data/repositories";

export default async function RequestPage({
    params,
}: {
    params: Promise<{ requestId: string }>;
}) {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const requestId = (await params).requestId;
    const request = await requestRepository.getRequestById(parseInt(requestId));
    const itemsInRequest = await itemInRequestRepository.getItemsInRequestList(
        parseInt(requestId),
    );
    const shopItems =
        await shopItemRepository.getAllShopItemsInOrganization(orgId);

    return (
        <IndividualRequest
            request={request}
            requestedItems={itemsInRequest}
            shopItems={shopItems}
        />
    );
}
