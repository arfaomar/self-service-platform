"use server";

import TicketStatusChart from "@components/dashboard/TicketStatusChart";
import TicketAmountChart from "@components/dashboard/TicketAmountChart";
import { auth } from "@clerk/nextjs/server";
import {
    getTicketAmountChartData,
    getTicketStatusChartData,
} from "@lib/data/useCases/getSupportDashboardChartData";

export default async function SupportDashboard() {
    const { orgId } = await auth();
    const ticketStatusChartData = await getTicketStatusChartData(String(orgId));
    const ticketAmountChartData = await getTicketAmountChartData(String(orgId));

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <TicketStatusChart chartData={ticketStatusChartData} />
                <TicketAmountChart chartData={ticketAmountChartData} />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </main>
    );
}
