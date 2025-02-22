"use server";
import SubmitTicketForm from "@components/support/SubmitTicketForm";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function SubmitTicketPage() {
    const { userId, orgId, has } = await auth();
    if (!userId || !orgId) {
        return null;
    }

    if (!has({ permission: "org:tickets:submit" })) {
        notFound();
    }
    return <SubmitTicketForm />;
}
