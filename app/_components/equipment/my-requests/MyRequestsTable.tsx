"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import {
    ItemInRequestList,
    ItemInRequestStatusEnum,
    Request,
} from "@lib/data/entities";
import { useRouter } from "next/navigation";
import { getBadgeVariant } from "@lib/utils";
import { Badge } from "@components/ui/Badge";

export interface MyRequestsTableProps {
    request: Request;
    items: ItemInRequestList[];
}

export default function MyRequestsTable({
    requests,
}: {
    requests: MyRequestsTableProps[];
}) {

    const router = useRouter();
    return (
        <section>
            <h1 className={"text-3xl font-semibold text-center"}>
                My Requests
            </h1>
            <div className={"mx-auto my-10 container rounded-lg bg-card p-4"}>
                {requests.length > 0 ? (
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
                            {requests.map((request, index) => (
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
                            No requests found
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}