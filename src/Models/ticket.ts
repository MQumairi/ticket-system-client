import { IUser } from "./user";
import { IProduct } from "./product";
import { IComment } from "./comment";
import { IStatus } from "./status";
import {IAttachment} from "./attachment";

export interface ITicket {
  post_id?: number;
  date_time: string;
  display_date?: string;
  description: string;
  author: IUser;
  title: string;
  product: IProduct;
  status: IStatus;
  comments: IComment[];
  developer?: IUser;
  is_archived?: boolean;
  attachment?: IAttachment;
}
