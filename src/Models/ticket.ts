export interface ITicket {
    authorId: number;
    id: number;
    status: string;
    product: string;
    title: string;
    date: string;
    description?: string;
}