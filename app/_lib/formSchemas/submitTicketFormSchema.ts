import * as z from "zod";

export const submitTicketFormSchema = z.object({
    ticketTitle: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title must be at most 100 characters long" }),
    ticketDescription: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, {
            message: "Description must be at most 500 characters long",
        }),
});
