import { IUser } from "./user";

export interface IRole {
    id: string;
    name: string;
    roleUsers: IUser[];
    userList: IUser[];
}