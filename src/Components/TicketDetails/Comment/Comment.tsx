import React, { useState } from "react";
import { IComment } from "../../../Models/comment";
import "./comment.css";
import { Button, Grid } from "semantic-ui-react";
import CommentsNew from "../CommentsNew/CommentsNew";
import Avatar from "../../Users/Avatar/Avatar";

interface IProps {
  comment: IComment;
}

const Comment: React.FC<IProps> = ({ comment }) => {
  // const store = useContext(Store);
  // const { getUser } = store.userStore;

  const [replyPressed, setReplyPressed] = useState(false);
  const revealReplyForm = () => {
    if (replyPressed)
      return <CommentsNew parent={comment} setReplyPressed={setReplyPressed} />;
  };

  const setReplyText = () => {
    if (replyPressed) return "Cancel";
    return "Reply";
  };

  //Array for the comments on this ticket
  let subComments: IComment[] = [];

  return (
    <div>
      <div className="commentContainer">
        {/* Comment Header */}
        <div className="commentHeader">
          <p className="postHeaderDate">{comment.display_date}</p>
          <hr />
        </div>
        {/* Comment Body */}
        <div className="commentBody">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2}>
                <Avatar
                  avatar={comment.user.avatar}
                  diameter={80}
                  borderWidth={4}
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <h2 className="posterName">{comment.user.username}</h2>
                <h4 className="posterRank">Poster Rank</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <p className="commentDescription">{comment.description}</p>
        </div>
        {/* Comment Footer */}
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={12}>
              <Button
                className="mainButton"
                onClick={() => setReplyPressed(!replyPressed)}
              >
                {setReplyText()}
              </Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className="mainButton">Delete</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className="mainButton">Edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      {revealReplyForm()}
      {subComments.map((comment) => {
        return (
          <div>
            <Comment comment={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
