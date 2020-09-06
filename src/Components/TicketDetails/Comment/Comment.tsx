import React, { useContext, useState } from "react";
import { IComment } from "../../../Models/comment";
import "./comment.css";
import { Button } from "semantic-ui-react";
import Store from "../../App/Store/rootStore";
import CommentForm from "../CommentsNew/CommentForm";
import AuthorAvatar from "../AuthorAvatar";

interface IProps {
  comment: IComment;
  parent_id: string;
}

const Comment: React.FC<IProps> = ({ comment, parent_id }) => {
  const store = useContext(Store);
  const { user } = store.userStore;
  const { currentTicket, getTicket } = store.ticketStore;

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

  if (editingComment)
    return (
      <CommentForm
        parent={currentTicket!}
        commentToEdit={comment}
        setEditingComment={setEditingComment}
      />
    );

  return (
    <div className="commentContainer">
      {/* Comment Header */}
      <div className="commentHeader">
        <p className="postHeaderDate">{comment.display_date}</p>
        <hr />
      </div>

      {/* Comment Body */}
      <div className="commentBody">
        <AuthorAvatar user={comment.author} />
        <p className="commentDescription">{comment.description}</p>
        {comment.attachment && (
          <div className="comment_attachment">
            <img alt={comment.attachment.id} src={comment.attachment.url} />
          </div>
        )}
      </div>

      {/* Comment Footer */}
      <div className="commentFooter">
      {user && (user!.id === comment.author.id || user?.role?.can_moderate) && (
        <div className="ticketDetailsButtons left">
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
          <Button
            className="mainButton"
            onClick={() => setEditingComment(!editingComment)}
          >
            Edit
          </Button>
        </div>
      )}
      </div>

      {/* {user && (
        <Grid>
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
                <Button
                  className="mainButton"
                  onClick={() => setEditingComment(!editingComment)}
                >
                  Edit
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )} */}
    </div>
  );
};

export default Comment;
