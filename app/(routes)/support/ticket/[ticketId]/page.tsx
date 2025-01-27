"use server";

import { Badge } from "@components/ui/Badge";
import {
    ticketConversationRepository,
    ticketRepository,
    ticketScreenshotRepository,
} from "@lib/data/repositories";
import { formatDate, getBadgeVariant } from "@lib/utils";
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
import { Button } from "@components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { TicketConversation } from "@lib/data/entities";
import ConversationInput from "@components/support/ticket/ConversationInput";

export default async function TicketPage({
    params,
}: {
    params: Promise<{ ticketId: string }>;
}) {
    const ticketId = (await params).ticketId;

    const ticket = await ticketRepository.getTicketById(parseInt(ticketId));

    const screenshots =
        await ticketScreenshotRepository.findTicketScreenshotsByTicketId(
            parseInt(ticketId),
        );

    const conversations: TicketConversation[] =
        await ticketConversationRepository.getTicketConversationsByTicketId(
            parseInt(ticketId),
        );

    return (
        <>
            <Card className={"mx-auto container mb-16"}>
                <CardHeader>
                    <CardTitle>{ticket.title}</CardTitle>

                    <div
                        className={
                            "text-sm flex flex-row justify-start items-center space-x-12"
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
                            <span className={"font-bold"}>#{ticket.id}</span>{" "}
                        </CardDescription>
                        <CardDescription>
                            <span className={"flex items-center"}>
                                <Clock4 className={"h-4 w-4 mr-2"} />
                                <p>{formatDate(ticket.creationDate)}</p>
                            </span>
                        </CardDescription>
                        <CardDescription>
                            <span className={"flex items-center"}>
                                <RotateCw className={"h-4 w-4 mr-2"} />
                                <p>
                                    {ticket.updateDate
                                        ? formatDate(ticket.updateDate)
                                        : "-"}
                                </p>
                            </span>
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className={"space-y-4"}>
                    <CardDescription>Description:</CardDescription>
                    <div
                        className={
                            "rounded-lg border border-muted-foreground bg-muted p-4 min-h-32"
                        }
                    >
                        <p
                            className={
                                "whitespace-nowrap overflow-hidden text-ellipsis"
                            }
                        >
                            {ticket.description}
                        </p>
                    </div>
                    <CardDescription>Attachments:</CardDescription>
                    <div
                        className={
                            "rounded-lg border border-muted-foreground bg-muted p-4 min-h-32"
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
                    <Button variant={"destructive"}>Close Ticket</Button>
                </CardFooter>
            </Card>
            {conversations.map((conversation) => (
                <ConversationCard
                    key={conversation.id}
                    {...conversation}
                />
            ))}
            <ConversationInput
                ticketId={ticketId}
            />
        </>
    );
}
