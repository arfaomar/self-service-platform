import { ItemInRequestList } from "@lib/data/entities";

export interface IItemInRequestListRepository {
    createItemInRequestList(
        itemInRequest: ItemInRequestList,
    ): Promise<ItemInRequestList>;
    getItemInRequestListById(id: number): Promise<ItemInRequestList>;
    getItemsInRequestList(requestId: number): Promise<ItemInRequestList[]>;
    updateItemInRequestList(
        itemInRequest: ItemInRequestList,
    ): Promise<ItemInRequestList>;
    deleteItemInRequestList(id: number): Promise<boolean>;
    getAllRequestsForOrganization(
        organizationId: string,
    ): Promise<ItemInRequestList[]>;
    deleteAllItemsInRequestList(requestId: number): Promise<boolean>;
}
