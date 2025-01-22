"use server";

import { submitTicketFormSchema } from "@lib/formSchemas";
import { auth } from "@clerk/nextjs/server";
import {
    ticketRepository,
    ticketScreenshotRepository,
} from "@lib/data/repositories";

export default async function SubmitTicketAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        console.log("ACTION");

        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return {
                message: "User not authenticated or not in an organization",
                error: true,
            };
        }

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
        const parsedData = submitTicketFormSchema.safeParse({
            ticketTitle: formData.get("ticketTitle"),
            ticketDescription: formData.get("ticketDescription"),
            images: formData.getAll("images") as File[],
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

        const newTicket = {
            title: parsedData.data.ticketTitle,
            description: parsedData.data.ticketDescription,
            ownerId: userId,
            organizationId: orgId,
        };

        const uploadedFiles = await uploadImages(parsedData.data.images);

        const ticket = await ticketRepository.createTicket(newTicket);

        await Promise.all(
            uploadedFiles.map(async (fileUrl) => {
                await ticketScreenshotRepository.createTicketScreenshot({
                    url: fileUrl,
                    ticketId: ticket.id,
                });
            }),
        );

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

const uploadImages = async (images: File[]) => {
    const uploadedFileUrls: string[] = [];
    for (const image of images) {
        try {
            const cloudData = new FormData();
            cloudData.append("file", image);
            cloudData.append("upload_preset", "self-service");
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: cloudData,
                },
            );

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            const imageUrl = data.secure_url;

            uploadedFileUrls.push(imageUrl);
        } catch (err) {
            console.error(err);
        } finally {
            console.log("File uploaded:", image.name);
        }
    }
    return uploadedFileUrls;
};
