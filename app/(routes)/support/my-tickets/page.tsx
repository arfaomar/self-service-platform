import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import { Ticket } from "@lib/data/entities";
import TicketTableBody from "@components/support/TicketTableBody";

export default async function MyTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    const userTickets : Ticket[] = await ticketRepository.getTicketsByUserId(
        userId,
        orgId,
    );

    if (userTickets.length === 0) {
        return (
            <section>
                <h1 className={"text-3xl font-semibold text-center"}>
                    My Tickets
                </h1>
                <div
                    className={"mx-auto my-10 container rounded-lg bg-card p-4"}
                >
                    <div className={"text-center"}>
                        <h1 className={"text-muted-foreground m-16"}>
                            No tickets found
                        </h1>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>My Tickets</h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TicketTableBody tickets={userTickets} />
                </Table>
            </div>
        </section>
    );
}
