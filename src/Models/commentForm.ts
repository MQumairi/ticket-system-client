export interface ICommentForm {
  post_id?: string;
  parent_post_id: number;
  date_time?: string;
  description?: string;
  author_id?: string;
  image?: File;
}
