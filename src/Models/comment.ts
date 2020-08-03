import { IUser } from "./user";

export interface IComment {
  post_id?: number;
  date_time: string;
  display_date?: string;
  description: string;
  user: IUser;
  parent_post_id: number;
}
