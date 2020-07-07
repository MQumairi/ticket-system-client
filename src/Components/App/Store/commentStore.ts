import { IComment } from "../../../Models/comment";
import { Store } from "./rootStore";
import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";

export default class CommentStore {
  constructor(public rootStore: Store) {}

  @observable commentList: IComment[] = [
    {
      id: 1,
      authorId: 2,
      date: "2020-12-01",
      description: "Working on it now",
      commentIds: [],
      parentType: "ticket",
    },
    {
      id: 2,
      authorId: 2,
      date: "2020-12-01",
      description: "Figured it out. Will be done by tomorrow.",
      commentIds: [3],
      parentType: "ticket",
    },
    {
      id: 3,
      authorId: 1,
      date: "2020-12-01",
      description: "Thanks Toshi",
      commentIds: [],
      parentType: "comment",
    },
  ];

  @action getComment = (id: string) => {
    let query = Number(id);
    return this.commentList.find((comment) => {
      return comment.id === query;
    });
  };

  @action listComments = (parent: ITicket | IComment, commentsArr: IComment[]) => {
    parent.commentIds.forEach((commentId) => {
      commentsArr.push(this.getComment(commentId.toString())!);
    });
  };
}
