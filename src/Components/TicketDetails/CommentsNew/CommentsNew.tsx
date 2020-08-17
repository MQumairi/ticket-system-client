import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import "./commentsNew.css";
import { ICommentForm } from "../../../Models/commentForm";
import { ITicket } from "../../../Models/ticket";
import Store from "../../App/Store/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../Utility/Final Form Fields/TextAreaInput";
import Dropzone from "../../Utility/Image Upload/Dropzone";
import { format } from "date-fns";
import formBuilder from "../../../Functions/buildFormData";
import { useHistory } from "react-router-dom";

interface IProps {
  parent: ITicket;
}

const CommentsNew: React.FC<IProps> = ({ parent }) => {

  let history = useHistory();

  const store = useContext(Store);
  const { addComment } = store.commentStore;
  const { user } = store.userStore;

  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFinalFormSubmit = (values: any) => {
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

  };

  return (
    <div className="commentFormContainer">
      <h2>Post a new comment</h2>
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
                // initialValue={ticketToEdit?.description}
              />
              <Dropzone setFile={setFile} />

              <Button className="mainButton" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default CommentsNew;
