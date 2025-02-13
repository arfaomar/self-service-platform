"use server";

import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";
import { Ticket } from "@lib/data/entities";
import PageSection from "@components/general/PageSection";
import MyTicketsTable from "@components/support/ticket/MyTicketsTable";

export default async function MyTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const userTickets: Ticket[] = await ticketRepository.getTicketsByUserId(
        userId,
        orgId,
    );

    return (
        <PageSection title={"My Tickets"} contentLength={userTickets.length}>
            <MyTicketsTable tickets={userTickets} />
        </PageSection>
    );
}
