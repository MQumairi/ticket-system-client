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
import { IComment } from "../../../Models/comment";
import { combineValidators, isRequired } from "revalidate";

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

  const store = useContext(Store);
  const { addComment, editComment } = store.commentStore;
  const { user } = store.userStore;
  const {getTicket} = store.ticketStore;

  const [file, setFile] = useState<File | undefined>(undefined);

  const validate = combineValidators({
    description: isRequired({ message: "A description is required" }),
  });

  const handleFinalFormSubmit = (values: any) => {
    if (!commentToEdit) {
      let commentToPost: ICommentForm = {
        date_time: format(Date.now(), "MM/dd/yyyy h:m:s a"),
        description: values.description,
        author_id: user!.id,
        parent_post_id: parent.post_id!,
        image: file,
      };

      addComment(formBuilder(commentToPost))
      .then(() => {
        getTicket(parent.post_id!.toString());
      })
      .then(() => {
        setIsReplying!(false);
      });
    } else {
      let commentBeingEdited: ICommentForm = {
        parent_post_id: parent.post_id!,
        description: values.description,
        image: file,
      };

      editComment(
        +commentToEdit.post_id!,
        formBuilder(commentBeingEdited)
      )
      .then(() => {
        getTicket(parent.post_id!.toString());
      })
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
        validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => {
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
              <Dropzone
                setFile={setFile}
                defaultAttach={commentToEdit?.attachment}
              />

              <div className="commentButtons">
                <Button
                  className="mainButton"
                  type="submit"
                  disabled={invalid || pristine}
                >
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
