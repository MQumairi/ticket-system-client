import { IAvatar } from "./avatar";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  first_name: string;
  surname: string;
  token: string;
  avatar: IAvatar;
  roles?: string[];

}
