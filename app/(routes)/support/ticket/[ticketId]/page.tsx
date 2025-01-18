export default async function TicketPage({
    params,
}: {
    params: Promise<{ ticketId: string }>;
}) {
    const ticketId = (await params).ticketId;
    return (
        <div>
            <h1>Support Ticket No:{ticketId}</h1>
        </div>
    );
}
