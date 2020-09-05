import { ITicket } from "./ticket";

export interface ITicketEnvelop {
    ticketCount: number;
    tickets: ITicket[];
}