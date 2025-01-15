export interface TicketScreenshot {
    id: number;
    ticketId: number;
    url: string;
    name: string;
}

export interface UpdatedTicketScreenshot extends Partial<Omit<TicketScreenshot, "id">> {
    id: number;
}