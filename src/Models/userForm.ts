import {IUserFormGeneral} from "./userFormGeneral";

export interface IUserForm extends IUserFormGeneral {
    password?: string;
    current_password?: string;
    new_password?: string;
}