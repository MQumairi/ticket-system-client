import React, { useContext } from "react";
import { IComment } from "../../../Models/comment";
import "./comment.css";
import { Button, Grid } from "semantic-ui-react";
import Avatar from "../../Users/Avatar/Avatar";
import Store from "../../App/Store/rootStore";

interface IProps {
  comment: IComment;
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const store = useContext(Store);
  const { user } = store.userStore;

  return (
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
                avatar={comment.author.avatar}
                diameter={80}
                borderWidth={4}
              />
            </Grid.Column>
            <Grid.Column width={14}>
              <h2 className="posterName">{comment.author.username}</h2>
              {comment.author.roles && (
                <h4 className="posterRank">{comment.author.roles[0]}</h4>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid.Row>
          <p className="commentDescription">{comment.description}</p>
        </Grid.Row>
        {comment.attachment && (
          <Grid.Row>
            <div className="comment_attachment">
              <img alt={comment.attachment.id} src={comment.attachment.url} />
            </div>
          </Grid.Row>
        )}
      </div>
      {/* Comment Footer */}
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={12}></Grid.Column>
          <Grid.Column width={2}>
            {user!.id === comment.author.id && (
              <Button className="mainButton">Delete</Button>
            )}
          </Grid.Column>
          <Grid.Column width={2}>
            {user!.id === comment.author.id && (
              <Button className="mainButton">Edit</Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Comment;
