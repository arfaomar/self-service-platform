export interface TicketScreenshot {
    id: number;
    ticketId: number;
    data: Buffer;
    fileFormat: string;
    name: string;
}

export interface UpdatedTicketScreenshot extends Partial<Omit<TicketScreenshot, "id">> {
    id: number;
}
