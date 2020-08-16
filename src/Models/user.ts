import { IAvatar } from "./avatar";

export interface IUser {
  user_id?: string;
  username: string;
  email: string;
  avatar: IAvatar;
  token: string;
}
