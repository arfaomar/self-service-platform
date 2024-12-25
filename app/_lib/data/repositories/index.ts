import { TicketRepository } from "./TicketRepository";
import { ShopItemRepository } from "./ShopItemRepository";
import { RequestRepository } from "./RequestRepository";
import { ItemInRequestListRepository } from "./ItemInRequestListRepository";

export const ticketRepository = new TicketRepository();
export const shopItemRepository = new ShopItemRepository();
export const requestRepository = new RequestRepository();
export const itemInRequestRepository = new ItemInRequestListRepository();
