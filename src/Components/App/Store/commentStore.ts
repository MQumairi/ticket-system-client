import { IComment } from "../../../Models/comment";
import { Store } from "./rootStore";
import { action } from "mobx";
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
