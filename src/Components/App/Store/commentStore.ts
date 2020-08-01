import { IComment } from "../../../Models/comment";
import { Store } from "./rootStore";
import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Comments } from "../../../API/agent";

export default class CommentStore {
  constructor(public rootStore: Store) {}

  @action addCommnet = async (newComment: IComment) => {
    try {
      await Comments.create(newComment);
    } catch (e) {
      console.log(e);
    }
  };
}
