export interface Inventory {
    id: number;
    ownerId: string;
    itemId: number;
    purchaseDate: Date;
    updateDate?: Date | null;
    status?: string | null;
}

export interface CreatedInventory
    extends Omit<Partial<Inventory>, "ownerId" | "itemId"> {
    ownerId: string;
    itemId: number;
}

export interface UpdatedInventory extends Partial<Omit<Inventory, "id">> {
    id: number;
}