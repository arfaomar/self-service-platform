import { db, ticket } from "../../../../db";
import { eq, count } from "drizzle-orm";
import { z } from "zod";

export type TicketStatusChartData = {
    status: "Open" | "Closed" | "In Progress" | "On Hold";
    count: number;
};

export async function getTicketStatusChartInfo(
    orgId: string,
): Promise<TicketStatusChartData[]> {
    const validOrgId = z.string().length(31).startsWith("org_").parse(orgId);

    const ticketCounts = await db
        .select({
            status: ticket.status,
            count: count(ticket.status),
        })
        .from(ticket)
        .where(eq(ticket.organizationId, validOrgId))
        .groupBy(ticket.status);

    return ticketCounts;
}
