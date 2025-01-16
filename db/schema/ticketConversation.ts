import {
    index,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const ticketConversation = pgTable(
    "ticket_conversation",
    {
        id: serial("id").primaryKey(),
        ticketId: integer("ticket_id").notNull(),
        userId: varchar("user_id", { length: 32 }).notNull(),
        content: varchar("content", { length: 255 }).notNull(),
        creationDate: timestamp("creation_date").defaultNow().notNull(),
    },
    (table) => ({
        idxTicketId: index("idx_ticket_conversation_ticket").on(table.ticketId),
    }),
);
