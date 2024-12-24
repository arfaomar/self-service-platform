import { ITicketRepository } from "../interfaces/ITicketRepository";
import { CreatedTicket, Ticket, UpdatedTicket } from "../entities";
import { z } from "zod";
import { db, ticket } from "../../../../db";
import { eq, and } from "drizzle-orm";

const PartialTicketSchema = z.object({
    title: z.string(),
    description: z.string(),
    ownerId: z.string().length(32).startsWith("user_"),
    organizationId: z.string().length(31).startsWith("org_"),
});

export class TicketRepository implements ITicketRepository {
    async createTicket(ticketData: CreatedTicket): Promise<{ id: number }> {
        const parsedTicketData = PartialTicketSchema.safeParse(ticketData);
        if (!parsedTicketData.success) {
            throw new Error(parsedTicketData.error.errors[0].message);
        }
        const partialTicket: PartialTicket = {
            ...parsedTicketData.data,
        };

        const [createdTicket] = await db
            .insert(ticket)
            .values(partialTicket)
            .returning({ id: ticket.id });
        return createdTicket;
    }

    async getTicketById(id: number): Promise<Ticket> {
        const validId = z.number().int().parse(id);
        const foundTicket = await db
            .select()
            .from(ticket)
            .where(eq(ticket.id, validId));

        if (foundTicket.length === 0) {
            throw new Error("Ticket not found");
        }
        return foundTicket; // Returns the found ticket object
    }

    async getTicketsByUserId(userId: string, orgId: string): Promise<Ticket[]> {
        const validUserId = z
            .string()
            .length(32)
            .startsWith("user_")
            .parse(userId);
        const validOrgId = z
            .string()
            .length(31)
            .startsWith("org_")
            .parse(orgId);

        const foundTickets = await db
            .select()
            .from(ticket)
            .where(
                and(
                    eq(ticket.ownerId, validUserId),
                    eq(ticket.organizationId, validOrgId),
                ),
            );
        return foundTickets;
    }

    async updateTicket(ticketData: UpdatedTicket): Promise<Ticket> {
        const updatedTicket = await db
            .update(ticket)
            .set(ticketData)
            .where(eq(ticket.id, ticketData.id))
            .returning();

        if (updatedTicket.length === 0) {
            throw new Error("Ticket not found for update");
        }
        return updatedTicket; // Returns the updated ticket object
    }

    async deleteTicket(id: number): Promise<boolean> {
        try {
            await db.delete(ticket).where(eq(ticket.id, id));
        } catch {
            throw new Error("Failed to delete ticket");
            return false;
        }
        return true;
    }
}
