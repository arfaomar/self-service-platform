import { IItemInRequestListRepository } from "@lib/data/interfaces/IItemInRequestListRepository";

export class ItemInRequestListRepository
    implements IItemInRequestListRepository
{
    getItemsInRequestListByRequestId(requestId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addItemToRequestList(
        requestId: number,
        itemId: number,
        amount: number,
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteItemInRequestList(requestId: number, itemId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateItemInRequestList(
        updatedItemInRequestList: PartialItemInRequestList,
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
