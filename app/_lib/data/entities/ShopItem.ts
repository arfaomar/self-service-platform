export interface ShopItem {
    id: number;
    name: string;
    description?: string | null;
    stock: number;
    organizationId: string;
}

export interface CreatedShopItem
    extends Omit<Partial<ShopItem>, "name" | "stock" | "organizationId"> {
    name: string;
    stock: number;
    organizationId: string;
}

export interface UpdatedShopItem extends Partial<Omit<ShopItem, "id">> {
    id: number;
}
