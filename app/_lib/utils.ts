import { z } from "zod";

export function getBadgeVariant(
    status: string,
): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case "Open":
            return "default";
        case "Closed":
            return "outline";
        case "On Hold":
            return "destructive";
        case "In Progress":
            return "secondary";
        default:
            return "outline";
    }
}

export function formatDate(date: Date): string {
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}

export async function fetchUserData(userId: string) {
    const validUserId = z.string().length(32).startsWith("user_").parse(userId);
    if (!validUserId) {
        throw new Error("Invalid user ID");
    }
    const response = await fetch(
        `https://api.clerk.dev/v1/users/${validUserId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
    }

    return await response.json();
}
