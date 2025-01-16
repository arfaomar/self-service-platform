import { TicketScreenshot, UpdatedTicketScreenshot } from "@lib/data/entities";

export interface ITicketScreenshotRepository {
    createTicketScreenshot(
        newTicketScreenshot: TicketScreenshot,
    ): Promise<TicketScreenshot>;
    findTicketScreenshotById(id: number): Promise<TicketScreenshot>;
    findTicketScreenshotsByTicketId(
        ticketId: number,
    ): Promise<TicketScreenshot[]>;
    updateTicketScreenshot(
        updatedTicketScreenshot: UpdatedTicketScreenshot,
    ): Promise<void>;
    deleteTicketScreenshot(id: number): Promise<void>;
}
