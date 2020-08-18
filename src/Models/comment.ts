import { IUser } from "./user";
import { IAttachment } from "./attachment";

export interface IComment {
  post_id?: number;
  date_time: string;
  display_date?: string;
  description: string;
  author: IUser;
  parent_post_id: number;
  attachment?: IAttachment;
}
