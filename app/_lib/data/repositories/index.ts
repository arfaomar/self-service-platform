import { TicketRepository } from "./TicketRepository";
import { ShopItemRepository } from "./ShopItemRepository";
import { ShopItemCategoryRepository } from "@lib/data/repositories/ShopItemCategoryRepository";
import { RequestRepository } from "./RequestRepository";
import { ItemInRequestListRepository } from "./ItemInRequestListRepository";

export const ticketRepository = new TicketRepository();
export const shopItemRepository = new ShopItemRepository();
export const shopItemCategoryRepository = new ShopItemCategoryRepository();
export const requestRepository = new RequestRepository();
export const itemInRequestRepository = new ItemInRequestListRepository();
