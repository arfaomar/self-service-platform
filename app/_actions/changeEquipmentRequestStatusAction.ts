"use server";

import { auth } from "@clerk/nextjs/server";
import { changeEquipmentRequestStatusFormSchema } from "@lib/formSchemas/changeEquipmentRequestStatusFormSchema";
import {
    itemInRequestRepository,
    requestRepository,
    shopItemRepository,
} from "@lib/data/repositories";
import {
    RequestStatusEnum,
    ItemInRequestStatusEnum,
    ItemInRequestList,
} from "@lib/data/entities";
import { SafeParseSuccess } from "zod";
import { revalidatePath } from "next/cache";

async function transitionToAccepted(
    itemInRequest: ItemInRequestList,
    parsedData: SafeParseSuccess<{
        requestId: number;
        status: ItemInRequestStatusEnum | RequestStatusEnum;
        itemInRequestId?: number | undefined;
    }>,
) {
    const shopItem = await shopItemRepository.getShopItemById(
        itemInRequest.itemId,
    );

    if (shopItem.stock < itemInRequest.quantity) {
        return false;
    }

    await shopItemRepository.updateShopItem({
        id: shopItem.id,
        stock: shopItem.stock - itemInRequest.quantity,
    });
    if (parsedData.data.itemInRequestId) {
        await itemInRequestRepository.updateItemInRequestList({
            status: parsedData.data.status as ItemInRequestStatusEnum,
            id: parsedData.data.itemInRequestId,
        });
    }

    await requestRepository.updateRequest({
        status: RequestStatusEnum.Accepted,
        id: parsedData.data.requestId,
    });
    return true;
}

async function transitionFromAccepted(
    itemInRequest: ItemInRequestList,
    parsedData: SafeParseSuccess<{
        requestId: number;
        status: ItemInRequestStatusEnum | RequestStatusEnum;
        itemInRequestId?: number | undefined;
    }>,
) {
    try {
        const shopItem = await shopItemRepository.getShopItemById(
            itemInRequest.itemId,
        );
        await shopItemRepository.updateShopItem({
            id: shopItem.id,
            stock: shopItem.stock + itemInRequest.quantity,
        });
        if (parsedData.data.itemInRequestId) {
            await itemInRequestRepository.updateItemInRequestList({
                status: parsedData.data.status as ItemInRequestStatusEnum,
                id: parsedData.data.itemInRequestId,
            });
        }

        if (parsedData.data.status === ItemInRequestStatusEnum.Declined) {
            const updatedItemsInRequest =
                await itemInRequestRepository.getItemsInRequestList(
                    parsedData.data.requestId,
                );
            const allDeclined = updatedItemsInRequest.every(
                (item) => item.status === ItemInRequestStatusEnum.Declined,
            );

            if (allDeclined) {
                await requestRepository.updateRequest({
                    status: RequestStatusEnum.Declined,
                    id: parsedData.data.requestId,
                });
            }
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default async function changeEquipmentRequestStatusAction(
    prevState: {
        message: string;
        success?: boolean;
        info?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return {
                message: "User not authenticated",
                error: true,
            };
        }

        const parsedData = changeEquipmentRequestStatusFormSchema.safeParse({
            status: formData.get("status"),
            requestId: Number(formData.get("requestId")),
            itemInRequestId: formData.get("itemInRequestId"),
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

        const itemsInRequest =
            await itemInRequestRepository.getItemsInRequestList(
                Number(parsedData.data.requestId),
            );

        if (parsedData.data.itemInRequestId) {
            const itemInRequest = itemsInRequest.find(
                (item) => item.id === Number(parsedData.data.itemInRequestId),
            );

            if (!itemInRequest) {
                return {
                    message: "Item in request not found",
                    error: true,
                };
            }

            if (itemInRequest.status === parsedData.data.status) {
                return {
                    message: "Status is already set to the desired value",
                    info: true,
                };
            }

            if (itemInRequest.status === ItemInRequestStatusEnum.Accepted) {
                if (
                    !(await transitionFromAccepted(itemInRequest, parsedData))
                ) {
                    return {
                        message: "Failed to Change Equipment Request Status",
                        error: true,
                    };
                }
            } else if (
                itemInRequest.status === ItemInRequestStatusEnum.Declined ||
                itemInRequest.status === ItemInRequestStatusEnum.Processing
            ) {
                if (!(await transitionToAccepted(itemInRequest, parsedData))) {
                    return {
                        message: "Not enough stock",
                        error: true,
                    };
                }
            } else {
                return {
                    message: "Invalid status transition",
                    info: true,
                };
            }
        } else {
            await requestRepository.updateRequest({
                status: parsedData.data.status as RequestStatusEnum,
                id: parsedData.data.requestId,
            });

            for (const itemInRequest of itemsInRequest) {
                if (itemInRequest.status !== parsedData.data.status) {
                    await itemInRequestRepository.updateItemInRequestList({
                        status: parsedData.data
                            .status as ItemInRequestStatusEnum,
                        id: itemInRequest.id,
                    });
                }
            }
        }
        revalidatePath(
            `/equipment/request/${String(parsedData.data.requestId)}`,
        );
        revalidatePath(`/equipment/shop`);
        revalidatePath(`/equipment/all-requests`);
        revalidatePath(`/equipment/my-requests`);

        return {
            message: "Equipment Request (Item) Status Changed",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "An error has occurred while Changing Equipment Request Status",
            error: true,
        };
    }
}

/*
This code changes the status of an equipment request.
The main function, `changeEquipmentRequestStatusAction`, handles the status change logic, while two helper functions:
`transitionToAccepted` and `transitionFromAccepted`, manage specific status transitions.
- The `transitionToAccepted` function updates the status of an item in the request to `Accepted` if there is enough stock. It updates the stock and the status of the item in the request.

- The `transitionFromAccepted` function handles the transition from `Accepted` to another status.
  It updates the stock and the status of the item in the request. If the new status is `Declined`, it checks if all
  items in the request are declined and updates the request status accordingly.

The main function, `changeEquipmentRequestStatusAction`, starts by authenticating the user and parsing the form data using the `zod` schema.
It retrieves the items in the request and checks if the status needs to be updated. Depending on the current and new statuses,
it calls either `transitionToAccepted` or `transitionFromAccepted` to handle the status change.
If no specific item in the request is being updated, it updates the status of the entire request and all items in the request.
*/
