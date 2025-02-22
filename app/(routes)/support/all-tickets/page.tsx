"use server";

import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";
import AllTicketsTable from "@components/support/ticket/AllTicketsTable";
import PageSection from "@components/general/PageSection";
import { notFound } from "next/navigation";

export default async function AllTicketsPage() {
    const { userId, orgId, has } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    if (
        !(
            has({ permission: "org:tickets:view_all" }) &&
            has({ permission: "org:tickets:manage_all" })
        )
    ) {
        notFound();
    }

    const tickets = await ticketRepository.getTicketsByOrganizationId(orgId);

    return (
        <PageSection title={"All Tickets"} contentLength={tickets.length}>
            <AllTicketsTable tickets={tickets} />
        </PageSection>
    );
}
