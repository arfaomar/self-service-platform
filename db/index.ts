import { drizzle } from "drizzle-orm/node-postgres";
import "../envConfig";

// You can specify any property from the node-postgres connection options
export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
    },
    casing: "snake_case",
});

export * from "./schema/request";
export * from "./schema/shopItem";
export * from "./schema/shopItemCategory";
export * from "./schema/inventory";
export * from "./schema/ticket";
export * from "./schema/enums";
export * from "./schema/itemInRequestList";
export * from "./schema/ticketScreenshot";
export * from "./schema/ticketConversation";
