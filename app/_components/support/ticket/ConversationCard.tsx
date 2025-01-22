"use server";
import { TicketConversation } from "@lib/data/entities";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";
import { formatDate } from "@lib/utils";

import Image from "next/image";

export default async function ConversationCard({
    content,
    creationDate,
    userId,
}: TicketConversation) {
    // const { fullName, imageUrl }: User = await clerkClient.users!.getUser(userId);

    console.log(userId);

    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
    });
    const userData = await response.json();
    if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
    }

    console.dir(userData, { depth: 7 });

    return (
        <Card className={"my-8 container mx-auto"}>
            <CardHeader>
                <CardTitle className={"flex flex-row items-center"}>
                    <Image
                    src={userData.image_url}
                    alt={userData.image_url}
                    width={32}
                    height={32}
                    className={"rounded-full mr-4"}
                />
                    {userData.first_name} {userData.last_name}
                </CardTitle>

            </CardHeader>
            <CardContent>{content}</CardContent>
            <CardFooter>
                <CardDescription>{formatDate(creationDate)}</CardDescription>
            </CardFooter>
        </Card>
    );
}
