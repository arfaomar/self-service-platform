"use server";

import { submitTicketFormSchema } from "@lib/formSchemas";
import { auth } from "@clerk/nextjs/server";
import { ticketRepository } from "@lib/data/repositories";

export default async function SubmitTicketAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const parsedData = submitTicketFormSchema.safeParse({
            ticketTitle: formData.get("ticketTitle"),
            ticketDescription: formData.get("ticketDescription"),
        });

        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(
                (error) => error.message,
            );
            return {
                message: errorMessages.join(", "),
                error: true,
            };
        }

        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return {
                message: "User not authenticated or not in an organization",
                error: true,
            };
        }

        const ticket = {
            title: parsedData.data.ticketTitle,
            description: parsedData.data.ticketDescription,
            ownerId: userId,
            organizationId: orgId,
        };

        await ticketRepository.createTicket(ticket);

        return {
            message: "Ticket submitted successfully",
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "An error has occurred while submitting the ticket",
            error: true,
        };
    }
}
