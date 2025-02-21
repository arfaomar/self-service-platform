"use server";

import TicketStatusChart from "@components/dashboard/TicketStatusChart";
import TicketAmountChart from "@components/dashboard/TicketAmountChart";
import { auth } from "@clerk/nextjs/server";
import {
    getTicketAmountChartData,
    getTicketStatusChartData,
} from "@lib/data/useCases/getSupportDashboardChartData";
import {
    itemInRequestRepository,
    requestRepository,
} from "@lib/data/repositories";
import MyRecentEquipmentRequestStatus from "@components/dashboard/MyRecentEquipmentRequestStatus";

export default async function SupportDashboard() {
    const { userId, orgId } = await auth();
    const ticketStatusChartData = await getTicketStatusChartData(String(orgId));
    const ticketAmountChartData = await getTicketAmountChartData(String(orgId));

    const myRequests = await requestRepository.getAllRequestsByUserId(
        String(userId),
        String(orgId),
    );

    const requestsWithItems = [];
    for (let i = 0; i < Math.min(myRequests.length, 5); i++) {
        const request = myRequests[i];
        const items = await itemInRequestRepository.getItemsInRequestList(
            request.id,
        );
        requestsWithItems.push({ request, items });
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <TicketStatusChart chartData={ticketStatusChartData} />
                <div className="flex flex-col rounded-xl bg-muted/50" />
                <MyRecentEquipmentRequestStatus
                    requestData={requestsWithItems}
                />
            </div>
            <TicketAmountChart chartData={ticketAmountChartData} />
        </main>
    );
}
