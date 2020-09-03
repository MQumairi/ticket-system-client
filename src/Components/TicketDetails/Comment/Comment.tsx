import React, { useContext, useState } from "react";
import { IComment } from "../../../Models/comment";
import "./comment.css";
import { Button, Grid } from "semantic-ui-react";
import Avatar from "../../Users/Avatar/Avatar";
import Store from "../../App/Store/rootStore";
import CommentForm from "../CommentsNew/CommentForm";

interface IProps {
  comment: IComment;
  parent_id: string;
}

const Comment: React.FC<IProps> = ({ comment, parent_id }) => {
  const store = useContext(Store);
  const { user } = store.userStore;
  const {currentTicket, getTicket} = store.ticketStore;

  const { deleteComment } = store.commentStore;

  const [editingComment, setEditingComment] = useState<boolean>(false);
  
    const [deletingComment, setDeletingComment] = useState<boolean>(false);

  const handleDelete = () => {
    setDeletingComment(true);
    deleteComment(comment.post_id!)
    .then(() => {
      setDeletingComment(false);
    })
    .then(() => {
      getTicket(parent_id);
    });
  };

  if(editingComment) return (<CommentForm parent={currentTicket!} commentToEdit={comment} setEditingComment={setEditingComment}/>);

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
              {comment.author.role && (
                <h4 className="posterRank">{comment.author.role.name}</h4>
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
      {user && <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={12}></Grid.Column>
          <Grid.Column width={2}>
            {(user!.id === comment.author.id || user?.role?.can_moderate) && (
              <Button
                className="mainButton"
                onClick={() => {
                  handleDelete();
                }}
                loading={deletingComment}
                disabled={deletingComment}
              >
                Delete
              </Button>
            )}
          </Grid.Column>
          <Grid.Column width={2}>
            {(user!.id === comment.author.id || user?.role?.can_moderate) && (
              <Button className="mainButton" onClick={() => setEditingComment(!editingComment)}>Edit</Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </div>
  );
};

export default Comment;
