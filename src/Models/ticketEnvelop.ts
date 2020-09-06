import { ITicket } from "./ticket";

export interface ITicketEnvelop {
    ticketCount: number;
    tickets: ITicket[];
}

export interface IArchiveEnvelop {
    archiveCount: number;
    archive: ITicket[];
} 