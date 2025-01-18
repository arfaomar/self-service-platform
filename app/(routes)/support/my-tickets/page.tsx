import { auth } from "@clerk/nextjs/server";
// import { ticketRepository } from "@lib/data/repositories";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import Link from "next/link";
import { Ticket, TicketStatusEnum } from "@lib/data/entities";

export default async function MyTicketsPage() {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    /*const userTickets : Ticket[] = await ticketRepository.getTicketsByUserId(
        userId,
        orgId,
    );*/
    const testTickets: Ticket[] = [
        {
            id: 1,
            title: "Issue with login",
            description: "Unable to login with correct credentials",
            status: TicketStatusEnum.Open,
            ownerId: "user1",
            creationDate: new Date("2023-01-01T10:00:00Z"),
            organizationId: "org1",
            supportId: "support1",
            updateDate: new Date("2023-01-02T10:00:00Z"),
        },
        {
            id: 2,
            title: "Page not loading",
            description: "The dashboard page is not loading",
            status: TicketStatusEnum.InProgress,
            ownerId: "user2",
            creationDate: new Date("2023-01-03T10:00:00Z"),
            organizationId: "org2",
            supportId: "support2",
            updateDate: new Date("2023-01-04T10:00:00Z"),
        },
        {
            id: 3,
            title: "Error in report generation",
            description: "Reports are not being generated correctly",
            status: TicketStatusEnum.Closed,
            ownerId: "user3",
            creationDate: new Date("2023-01-05T10:00:00Z"),
            organizationId: "org3",
            supportId: undefined,
            updateDate: new Date("2023-01-06T10:00:00Z"),
        },
    ];

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>My Tickets</h1>
            <div className={"mx-auto mb-10 mt-4 container"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Assigned To</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testTickets.map((ticket) => (
                            <TableRow key={ticket.id + 1}>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell>{ticket.title}</TableCell>
                                <TableCell>{ticket.status}</TableCell>
                                <TableCell>
                                    {ticket.creationDate.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {ticket.updateDate?.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {ticket.supportId ?? "Not Assigned"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
