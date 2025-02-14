"use client";

import {
    ItemInRequestList,
    ItemInRequestStatusEnum,
    Request,
    ShopItem,
} from "@lib/data/entities";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/Table";
import Image from "next/image";
import { Skeleton } from "@components/ui/Skeleton";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/Select";

export interface IndividualRequestProps {
    request: Request;
    requestedItems: ItemInRequestList[];
    shopItems: ShopItem[];
}

export default function IndividualRequest({
    request,
    requestedItems,
    shopItems,
}: IndividualRequestProps) {
    return (
        <section>
            <h1 className={"text-center text-3xl font-semibold"}>
                Request {request.id}
            </h1>
            <div className={"container mx-auto my-10 rounded-lg bg-card p-8"}>
                <aside className={""}>
                    <h2 className={"p-2 text-center text-xl"}>
                        Request Information
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"w-1/12"}>User</TableHead>
                                <TableHead className={"w-1/12"}>
                                    Creation Date
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Update Date
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{request.userId}</TableCell>
                                <TableCell>
                                    {request.creationDate.toDateString()}
                                </TableCell>
                                <TableCell>
                                    {request.updateDate ? (
                                        request.updateDate.toDateString()
                                    ) : (
                                        <span
                                            className={"text-muted-foreground"}
                                        >
                                            Not updated yet
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>{request.status}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </aside>
                <aside className={"mt-12"}>
                    <h2 className={"text-center text-xl"}>Requested Items</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"w-1/12"}>
                                    Image
                                </TableHead>
                                <TableHead className={"w-1/12"}>Name</TableHead>
                                <TableHead className={"w-1/12"}>
                                    Quantity
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Stock
                                </TableHead>
                                <TableHead className={"w-1/12"}>
                                    Status
                                </TableHead>
                                <TableHead className={"w-1/12"}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requestedItems.map((item) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell
                                            className={
                                                "flex w-fit flex-row text-center"
                                            }
                                        >
                                            {shopItems.find(
                                                (shopItem) =>
                                                    shopItem.id === item.itemId,
                                            )?.url ? (
                                                <Image
                                                    className={
                                                        "h-12 w-12 rounded-lg bg-gray-400 object-cover"
                                                    }
                                                    src={
                                                        shopItems.find(
                                                            (shopItem) =>
                                                                shopItem.id ===
                                                                item.itemId,
                                                        )?.url || ""
                                                    }
                                                    alt={
                                                        shopItems.find(
                                                            (shopItem) =>
                                                                shopItem.id ===
                                                                item.itemId,
                                                        )?.name || ""
                                                    }
                                                    width={48}
                                                    height={48}
                                                />
                                            ) : (
                                                <Skeleton className="h-24 w-24 content-center rounded-lg bg-background text-center">
                                                    <div>No Image</div>
                                                </Skeleton>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                shopItems.find(
                                                    (shopItem) =>
                                                        shopItem.id ===
                                                        item.itemId,
                                                )?.name
                                            }
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {
                                                shopItems.find(
                                                    (shopItem) =>
                                                        shopItem.id ===
                                                        item.itemId,
                                                )?.stock
                                            }
                                        </TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Change Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem
                                                            value={
                                                                ItemInRequestStatusEnum.Accepted
                                                            }
                                                        >
                                                            Accept
                                                        </SelectItem>
                                                        <SelectItem
                                                            value={
                                                                ItemInRequestStatusEnum.Declined
                                                            }
                                                        >
                                                            Decline
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </aside>
            </div>
        </section>
    );
}
