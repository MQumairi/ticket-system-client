import { IAvatar } from "./avatar";
import { IRole } from "./role";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  first_name: string;
  surname: string;
  token: string;
  avatar: IAvatar;
  role?: IRole;
}
