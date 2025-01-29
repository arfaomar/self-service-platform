"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";

import { ItemInRequestList, ItemInRequestStatusEnum, Request } from "@lib/data/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table";
import { Badge } from "@components/ui/Badge";
import { getBadgeVariant } from "@lib/utils";
import { useRouter } from "next/navigation";

interface MyRecentEquipmentRequestStatusProps {
    request: Request;
    items: ItemInRequestList[];
}
export default function MyRecentEquipmentRequestStatus({
    requestData,
}: {
    requestData: MyRecentEquipmentRequestStatusProps[];
}) {
    const router = useRouter();

    return (
        <Card className=" rounded-xl bg-muted/50 flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>My Equipment Requests</CardTitle>
                <CardDescription>description</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 container">
                {requestData.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"w-1/12"}>ID</TableHead>
                                <TableHead className={"w-2/12"}>
                                    Creation Date
                                </TableHead>
                                <TableHead className={"w-2/12"}>
                                    Update Date
                                </TableHead>
                                <TableHead className={"w-2/12"}>
                                    Status
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Requested Items
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Accepted Items
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Declined Items
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requestData.map((request, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() => router.push(`/equipment/request/${request.request.id}`)}
                                    className="cursor-pointer"
                                >
                                    <TableCell>{request.request.id}</TableCell>
                                    <TableCell>
                                        {request.request.creationDate.toDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {request.request.updateDate ? (
                                            request.request.updateDate.toDateString()
                                        ) : (
                                            <span
                                                className={
                                                    "text-muted-foreground"
                                                }
                                            >
                                                N/A
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getBadgeVariant(request.request.status)}>
                                            {request.request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {request.items.length}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            request.items.filter(
                                                (item) =>
                                                    item.status ===
                                                    ItemInRequestStatusEnum.Accepted
                                            ).length > 0 ? (
                                                request.items.filter(
                                                    (item) =>
                                                        item.status ===
                                                        ItemInRequestStatusEnum.Accepted
                                                ).length
                                            ) : (
                                                <span
                                                    className={
                                                        "text-muted-foreground"
                                                    }
                                                >
                                                    0
                                                </span>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            request.items.filter(
                                                (item) =>
                                                    item.status ===
                                                    ItemInRequestStatusEnum.Declined
                                            ).length > 0 ? (
                                                request.items.filter(
                                                    (item) =>
                                                        item.status ===
                                                        ItemInRequestStatusEnum.Declined
                                                ).length
                                            ) : (
                                                <span
                                                    className={
                                                        "text-muted-foreground"
                                                    }
                                                >
                                                    0
                                                </span>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className={"text-center"}>
                        <h1 className={"text-muted-foreground m-16"}>
                            No new requests found
                        </h1>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
