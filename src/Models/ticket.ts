import { IUser } from "./user";
import { IProduct } from "./product";
import { IComment } from "./comment";
import { IStatus } from "./status";

export interface ITicket {
  post_id?: number;
  date_time: string;
  display_date?: string;
  description: string;
  user: IUser;
  title: string;
  product: IProduct;
  status: IStatus;
  commnets: IComment[];
}
