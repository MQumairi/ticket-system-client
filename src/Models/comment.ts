export interface IComment {
    id: number;
    authorId: number;
    date: string;
    description: string;
    commentIds: number[];
}