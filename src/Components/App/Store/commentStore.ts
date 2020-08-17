import { Store } from "./rootStore";
import { action } from "mobx";
import { Comments } from "../../../API/agent";

export default class CommentStore {
  constructor(public rootStore: Store) {}

  @action addComment = async (newComment: FormData) => {
    try {
      await Comments.create(newComment);
    } catch (e) {
      console.log(e);
    }
  };
}
