import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";
import AllTicketsTable from "@components/support/ticket/AllTicketsTable";

export default async function AllTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const tickets = await ticketRepository.getTicketsByOrganizationId(orgId)



    return (
        <AllTicketsTable tickets={tickets}/>
    );
}
