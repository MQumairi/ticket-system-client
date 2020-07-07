import React, { useContext, useState } from "react";
import { IComment } from "../../../Models/comment";
import "./comment.css";
import { Button, Grid } from "semantic-ui-react";
import Store from "../../App/Store/rootStore";
import Avatar from "../../Users/Avatar/Avatar";
import CommentsNew from "../CommentsNew/CommentsNew";

interface IProps {
  comment: IComment;
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const store = useContext(Store);
  const { getUser } = store.userStore;
  const { listComments } = store.commentStore;

  const poster = getUser(comment.authorId.toString());

  const [replyPressed, setReplyPressed] = useState(false);
  const revealReplyForm = () => {
    if (replyPressed) return <CommentsNew parent={comment} setReplyPressed={setReplyPressed}/>;
  };

  const setReplyText = () => {
    if (replyPressed) return "Cancel";
    return "Reply";
  };

  //Array for the comments on this ticket
  let subComments: IComment[] = [];
  listComments(comment, subComments);

  return (
    <div>
      <div className="commentContainer">
        {/* Comment Header */}
        <div className="commentHeader">
          <p className="postHeaderDate">{comment.date}</p>
          <hr />
        </div>
        {/* Comment Body */}
        <div className="commentBody">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2}>
                <Avatar
                  userId={poster!.id.toString()}
                  diameter={80}
                  borderWidth={4}
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <h2 className="posterName">
                  {poster?.firstName} {poster?.lastName}
                </h2>
                <h4 className="posterRank">{poster?.rank}</h4>
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
        return <div>
          <Comment comment={comment}/>
          </div>;
      })}
    </div>
  );
};

export default Comment;
