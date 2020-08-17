import { IAvatar } from "./avatar";

export interface IUser {
  user_id?: string;
  username: string;
  email: string;
  first_name: string;
  surname: string;
  token: string;
  avatar: IAvatar;
}
