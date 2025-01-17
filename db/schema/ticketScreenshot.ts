// db/schema.ts
import { integer, pgTable, serial, varchar, customType } from "drizzle-orm/pg-core";
import { ticket } from "./ticket";

const bytea = customType<{data: Buffer; notNull: true}>({
    dataType() {
        return "bytea";
    },
})

export const ticketScreenshot = pgTable("ticket_screenshot", {
    id: serial("id").primaryKey(),
    ticketId: integer("ticket_id")
        .notNull()
        .references(() => ticket.id, {
            onUpdate: "cascade",
            onDelete: "cascade",
        }),
    data: bytea("data").notNull(),
    fileFormat: varchar("file_format", { length: 4 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
});