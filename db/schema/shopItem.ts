import { index, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const shopItem = pgTable(
    "shop_item",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        description: varchar("description", { length: 255 }),
        stock: integer("stock").notNull(),
        organizationId: varchar("organization_id", { length: 255 }).notNull(),
    },
    (table) => ({
        idxOrganizationId: index("idx_shop_item_organization").on(
            table.organizationId,
        ),
    }),
);
