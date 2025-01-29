"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import { Ticket } from "@lib/data/entities";
import { formatDate, getBadgeVariant } from "@lib/utils";
import { Badge } from "@components/ui/Badge";
import { useRouter } from "next/navigation";

export interface AllTicketsTableProps {
    tickets: Ticket[];
}

export default function AllTicketsTable({ tickets }: AllTicketsTableProps) {
    const router = useRouter();

    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                All Tickets
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {tickets.length > 0 ? (
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
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow
                                    key={ticket.id}
                                    onClick={() =>
                                        router.push(
                                            `/support/ticket/${ticket.id}`,
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getBadgeVariant(
                                                ticket.status,
                                            )}
                                        >
                                            {ticket.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(ticket.creationDate)}
                                    </TableCell>
                                    <TableCell>
                                        {ticket.updateDate
                                            ? formatDate(ticket.updateDate)
                                            : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className={"text-center"}>
                        <h1 className={"text-muted-foreground m-16"}>
                            No tickets found
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}
