"use server";

import { Badge } from "@components/ui/Badge";
import {
    ticketConversationRepository,
    ticketRepository,
    ticketScreenshotRepository,
} from "@lib/data/repositories";
import { fetchUserData, formatDate, getBadgeVariant } from "@lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";
import ConversationCard from "@components/support/ticket/ConversationCard";
import { Clock4, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TicketConversation } from "@lib/data/entities";
import ConversationInput from "@components/support/ticket/ConversationInput";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ChangeTicketStatusForm from "@components/support/ticket/ChangeTicketStatusForm";
import CloseTicketForm from "@components/support/ticket/CloseTicketForm";
import { Skeleton } from "@components/ui/Skeleton";

export default async function TicketPage({
    params,
}: {
    params: Promise<{ ticketId: string }>;
}) {
    const ticketId = (await params).ticketId;

    const ticket = await ticketRepository.getTicketById(parseInt(ticketId));

    const { userId, has } = await auth();

    const canSeeAllTickets =
        has({ permission: "org:tickets:manage_all" }) &&
        has({ permission: "org:tickets:view_all" });

    const canSeeTicket = ticket.ownerId === userId || canSeeAllTickets;

    if (!canSeeTicket) {
        notFound();
    }

    const screenshots =
        await ticketScreenshotRepository.findTicketScreenshotsByTicketId(
            parseInt(ticketId),
        );

    const conversations: TicketConversation[] =
        await ticketConversationRepository.getTicketConversationsByTicketId(
            parseInt(ticketId),
        );

    const userData = await fetchUserData(ticket.ownerId);

    return (
        <>
            <Card className={"container mx-auto mb-16"}>
                <CardHeader>
                    <div className={"flex flex-row justify-between"}>
                        <div className={"space-y-4"}>
                            <CardTitle>{ticket.title}</CardTitle>
                            <div
                                className={
                                    "flex flex-row items-center justify-start space-x-12 text-sm"
                                }
                            >
                                <CardDescription>
                                    <Badge
                                        variant={getBadgeVariant(ticket.status)}
                                        className={"mr-2"}
                                    >
                                        {ticket.status}
                                    </Badge>
                                    Ticket{" "}
                                    <span className={"font-bold"}>
                                        #{ticket.id}
                                    </span>{" "}
                                </CardDescription>
                                <CardDescription>
                                    <span className={"flex items-center"}>
                                        <Clock4 className={"mr-2 h-4 w-4"} />
                                        <p>{formatDate(ticket.creationDate)}</p>
                                    </span>
                                </CardDescription>
                                <CardDescription>
                                    <span className={"flex items-center"}>
                                        <RotateCw className={"mr-2 h-4 w-4"} />
                                        <p>
                                            {ticket.updateDate
                                                ? formatDate(ticket.updateDate)
                                                : "-"}
                                        </p>
                                    </span>
                                </CardDescription>
                                <CardDescription
                                    className={"flex items-center gap-x-2"}
                                >
                                    <p>
                                        By:{" "}
                                        {userData?.first_name +
                                            " " +
                                            userData?.last_name || "Unknown"}
                                    </p>
                                    {userData?.image_url ? (
                                        <Image
                                            src={userData.image_url}
                                            alt={
                                                userData?.first_name +
                                                " " +
                                                userData?.last_name +
                                                "image"
                                            }
                                            height={36}
                                            width={36}
                                            className={"h-9 w-9 rounded-lg"}
                                        />
                                    ) : (
                                        <Skeleton className="h-9 w-9 content-center items-center rounded-lg text-center">
                                            <div>NA</div>
                                        </Skeleton>
                                    )}
                                </CardDescription>
                            </div>
                        </div>
                        {canSeeAllTickets && (
                            <ChangeTicketStatusForm
                                ticketId={ticketId}
                                currentStatus={ticket.status}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className={"space-y-4"}>
                    <CardDescription>Description:</CardDescription>
                    <div
                        className={
                            "min-h-32 rounded-lg border border-muted-foreground bg-muted p-4"
                        }
                    >
                        <p
                            className={
                                "line-clamp-6 overflow-hidden text-ellipsis"
                            }
                        >
                            {ticket.description}
                        </p>
                    </div>
                    <CardDescription>Attachments:</CardDescription>
                    <div
                        className={
                            "flex min-h-32 flex-row gap-x-4 rounded-lg border border-muted-foreground bg-muted p-4"
                        }
                    >
                        {screenshots.map((screenshot) => (
                            <Link
                                target={"_blank"}
                                href={screenshot.url}
                                key={screenshot.id}
                            >
                                <Image
                                    src={screenshot.url}
                                    alt={
                                        screenshot.id.toString() + "-screenshot"
                                    }
                                    width={128}
                                    height={128}
                                />
                            </Link>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className={"grid justify-items-end"}>
                    {ticket.ownerId === userId && (
                        <CloseTicketForm ticketId={ticketId} />
                    )}
                </CardFooter>
            </Card>
            {conversations.map((conversation) => (
                <ConversationCard key={conversation.id} {...conversation} />
            ))}
            <ConversationInput
                ticketId={ticketId}
                ticketStatus={ticket.status}
            />
        </>
    );
}
