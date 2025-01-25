"use client";
import { Ticket } from "@lib/data/entities";
import { TableBody, TableCell, TableRow } from "@components/ui/Table";
import { useRouter } from "next/navigation";
import { Badge } from "@components/ui/Badge";
import { formatDate, getBadgeVariant } from "@lib/utils";

interface TicketTableBodyProps {
    tickets: Ticket[];
}

export default function TicketTableBody({ tickets }: TicketTableBodyProps) {

    const router = useRouter();

    return (
        <TableBody>
            {tickets.length === 0 ? (
                <TableRow>
                    <TableCell
                        className="h-24 text-center content-center"
                        colSpan={5}
                    >
                        No tickets found. Have you submitted one yet?
                    </TableCell>
                </TableRow>
            ) : (
                tickets.map((ticket: Ticket) => (
                    <TableRow
                        className="hover:cursor-pointer"
                        key={ticket.id + 1}
                        onClick={() =>
                            router.push(`/support/ticket/${ticket.id}`)
                        }
                    >
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(ticket.status)}>
                                {ticket.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {formatDate(ticket.creationDate)}
                        </TableCell>
                        <TableCell>
                            {ticket.updateDate ? formatDate(ticket.updateDate) : "-"}
                        </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    );
}
