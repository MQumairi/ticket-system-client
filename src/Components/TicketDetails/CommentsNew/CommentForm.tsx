import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import "./commentForm.css";
import { ICommentForm } from "../../../Models/commentForm";
import { ITicket } from "../../../Models/ticket";
import Store from "../../App/Store/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../Utility/Final Form Fields/TextAreaInput";
import Dropzone from "../../Utility/Image Upload/Dropzone";
import { format } from "date-fns";
import formBuilder from "../../../Functions/buildFormData";
import { useHistory } from "react-router-dom";
import { IComment } from "../../../Models/comment";

interface IProps {
  parent: ITicket;
  commentToEdit?: IComment;
  setIsReplying?: (isReplying: boolean) => void;
  setEditingComment?: (editingComment: boolean) => void;
}

const CommentForm: React.FC<IProps> = ({
  parent,
  commentToEdit,
  setIsReplying,
  setEditingComment,
}) => {
  let history = useHistory();

  const store = useContext(Store);
  const { addComment, editComment } = store.commentStore;
  const { user } = store.userStore;

  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFinalFormSubmit = (values: any) => {

    if (!commentToEdit) {
      let commentToPost: ICommentForm = {
        date_time: format(Date.now(), "MM/dd/yyyy h:m:s a"),
        description: values.description,
        author_id: user!.id,
        parent_post_id: parent.post_id!,
        image: file,
      };

      addComment(formBuilder(commentToPost)).then(() => {
        history.go(0);
      });
    } else {

      let commentBeingEdited: ICommentForm = {
        parent_post_id: parent.post_id!,
        description: values.description,
        image: file
      }

      editComment(+commentToEdit.post_id! ,formBuilder(commentBeingEdited)).then(() => {
        history.go(0);
      });

    }
  };

  const handleCancel = () => {
    if (setIsReplying) setIsReplying(false);
    if (setEditingComment) setEditingComment(false);
  };

  return (
    <div className="commentFormContainer">
      {!commentToEdit && <h2>Post a new comment</h2>}
      {commentToEdit && <h2>Edit your comment</h2>}
      <hr />
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                inputLabel="Comment"
                placeholder="Describe your problem..."
                rows={10}
                name="description"
                component={TextAreaInput}
                initialValue={commentToEdit?.description}
              />
              <Dropzone setFile={setFile} defaultAttach={commentToEdit?.attachment} />

              <div className="commentButtons">
                <Button className="mainButton" type="submit">
                  Submit
                </Button>
                <Button
                  className="mainButton"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default CommentForm;
