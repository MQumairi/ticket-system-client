import React, { useContext } from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import "./commentsNew.css";
import { IComment } from "../../../Models/comment";
import { ITicket } from "../../../Models/ticket";
import Store from "../../App/Store/rootStore";

interface IProps {
  parent: ITicket | IComment;
  // replyPressed: boolean;
  setReplyPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsNew: React.FC<IProps> = ({ parent, setReplyPressed }) => {
  const store = useContext(Store);
  const { addCommnet } = store.commentStore;
  const { user } = store.userStore;
  const { currentTicket } = store.ticketStore;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const today = new Date();

    let newComment: IComment = {
      description: e.currentTarget.commentNewDesc.value,
      date_time: "2020-07-31T18:47:50.605697",
      user: user!,
      parent_post_id: currentTicket!.post_id!,
    };

    //Add comment
    addCommnet(newComment);
    setReplyPressed(false);
  };

  return (
    <div className="commentFormContainer">
      <h2>Post a new comment</h2>
      <hr />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Field
          id="commentDescriptionInput"
          control={TextArea}
          label="Comment"
          placeholder="Comment"
          name="commentNewDesc"
        />
        <Button className="mainButton" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CommentsNew;
