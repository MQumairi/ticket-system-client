import { IUser } from "./user";

export interface IACPSettings {
    founder: IUser;
    registration_locked: boolean;
    admin_list: IUser[];
}

export interface IACPSettingsForm {
    founder_id: string;
    registration_locked: boolean;
}