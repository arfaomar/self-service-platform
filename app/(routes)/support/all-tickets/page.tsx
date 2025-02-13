"use server";

import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";
import AllTicketsTable from "@components/support/ticket/AllTicketsTable";
import PageSection from "@components/general/PageSection";

export default async function AllTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const tickets = await ticketRepository.getTicketsByOrganizationId(orgId);

    return (
        <PageSection title={"All Tickets"} contentLength={tickets.length}>
            <AllTicketsTable tickets={tickets} />
        </PageSection>
    );
}
