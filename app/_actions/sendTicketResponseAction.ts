"use server";

import { auth } from "@clerk/nextjs/server";
import { sendTicketResponseFormSchema } from "@lib/formSchemas";
import { ticketConversationRepository } from "@lib/data/repositories";
import { CreatedTicketConversation } from "@lib/data/entities";
import { revalidatePath } from "next/cache";

export default async function sendTicketResponseAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return {
                message: "User not authenticated or not in an organization",
                error: true,
            };
        }

        if (!formData.get("ticketId") || !formData.get("content")) {
            return {
                message: "Ticket ID and content are required",
                error: true,
            };
        }

        const parsedData = sendTicketResponseFormSchema.safeParse({
            ticketId: parseInt(formData.get("ticketId") as string),
            content: formData.get("content"),
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
        const newTicketConversation: CreatedTicketConversation = {
            ticketId: parsedData.data.ticketId,
            content: parsedData.data.content,
            userId: userId,
        };

        await ticketConversationRepository.createTicketConversation(
            newTicketConversation,
        );

        revalidatePath(`/support/ticket/${parsedData.data.ticketId}`);

        return {
            message: "Ticket response sent successfully",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred while sending the ticket response",
            error: true,
        };
    }
}
