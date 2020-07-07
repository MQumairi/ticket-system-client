import React, { Dispatch, SetStateAction } from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import "./commentsNew.css";

const CommentsNew = () => {
  return (
    <div className="commentFormContainer">
      <h2>Post a new comment</h2>
      <hr />
      <Form>
        <Form.Field
          id="commentDescriptionInput"
          control={TextArea}
          label="Comment"
          placeholder="Comment"
        />
        <Button className="mainButton" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CommentsNew;
