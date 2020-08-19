export interface ITicketForm {
  post_id?: string;
  date_time?: string;
  description?: string;
  author_id?: string;
  title?: string;
  product_id?: number;
  status_id?: number;
  developer_id?: string;
  is_archived?: boolean;
  image?: File
}
