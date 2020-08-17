import { Store } from "./rootStore";
import { action } from "mobx";
import { Comments } from "../../../API/agent";
import { IComment } from "../../../Models/comment";

export default class CommentStore {
  constructor(public rootStore: Store) {}

  @action addComment = async (newComment: FormData) => {
    try {
      await Comments.create(newComment);
    } catch (e) {
      console.log(e);
    }
  };

  @action deleteComment = async (commentId: number) => {
    try {
      await Comments.delete(commentId.toString());
    } catch (e) {
      console.log(e);
    }
  };

  @action editComment = async (commentId: number, comment: FormData) => {
    try {
      await Comments.edit(commentId.toString(), comment);
    } catch (e) {
      console.log(e);
    }
  }
}
