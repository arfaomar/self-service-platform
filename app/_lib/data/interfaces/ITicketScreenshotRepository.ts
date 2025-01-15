import { TicketScreenshot, UpdatedTicketScreenshot } from "@lib/data/entities";

export interface ITicketScreenshotRepository {
    createTicketScreenshot(ticketScreenshot: TicketScreenshot): Promise<TicketScreenshot>;
    findTicketScreenshotById(id: number): Promise<TicketScreenshot>;
    findTicketScreenshotsByTicketId(ticketId: number): Promise<TicketScreenshot[]>;
    updateTicketScreenshot(ticketScreenshot: UpdatedTicketScreenshot): Promise<void>;
    deleteTicketScreenshot(id: number): Promise<void>;
}