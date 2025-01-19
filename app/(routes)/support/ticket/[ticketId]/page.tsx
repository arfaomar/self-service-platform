"use server";

//import { Ticket } from "@lib/data/entities";
import { Badge } from "@components/ui/Badge";
export default async function TicketPage({
                                             params,
                                         }: {
    params: Promise<{ ticketId: string }>;
}) {
    const ticketId = (await params).ticketId;

    const getBadgeVariant = (status: string) => {
        switch (status) {
            case "Open":
                return "default";
            case "Closed":
                return "outline";
            case "On Hold":
                return "destructive";
            case "In Progress":
                return "secondary";
            default:
                return "outline";
        }
    };

    // Mock data, replace with a real API fetch or database query
    const ticket = {

        title: "Sample Ticket Title",
        description: "This is a sample ticket description with multiple lines.\nIt demonstrates how the content would look in the description box.\nFeel free to replace this with dynamic data.",
        status: "Open",
        createdAt: "2025-01-19",
        updatedAt: "2025-01-19",
        assignedTo: "John Doe",

    };

    return (
        <div className="max-w-4xl bg-card mx-auto mt-8 p-4 border rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="mb-6">
                <p className="text-muted-foreground text-sm font-medium">
                    Ticket: <span className="font-bold">#{ticketId}</span>
                </p>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{ticket.title}</h1>
                    <Badge variant={getBadgeVariant(ticket.status)}>
                        {ticket.status}
                    </Badge>
                </div>
            </div>

            {/* Metadata Section */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                <div>
                    <p>
                        <strong>Created At:</strong> {ticket.createdAt}
                    </p>
                    <p>
                        <strong>Updated At:</strong> {ticket.updatedAt || "N/A"}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Assigned to:</strong>{" "}
                        {ticket.assignedTo || "Unassigned"}
                    </p>
                </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
                <h2 className="font-bold mb-2">Description:</h2>
                <div className="p-4 bg-gray-100 rounded-lg border text-gray-800 whitespace-pre-line">
                    {ticket.description}
                </div>
            </div>
        </div>
    );
}
