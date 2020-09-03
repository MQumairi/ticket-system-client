import { IUser } from "./user";

export interface IRole {
    id: string;
    name: string;
    can_manage: boolean;
    can_moderate: boolean;
    roleUsers: IUser[];
    userList: IUser[];
}