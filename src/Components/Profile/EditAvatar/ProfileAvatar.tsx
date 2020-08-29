import React, { useState, useContext } from "react";
import Dropzone from "../../Utility/Image Upload/Dropzone";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import Store from "../../App/Store/rootStore";

interface IProps {
  setActive: (active: string) => void;
}

const ProfileAvatar: React.FC<IProps> = ({ setActive }) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const store = useContext(Store);
  const { user, addAvatar } = store.userStore;

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);
    const formData: FormData = new FormData();

    if (file) formData.set("image", file);

    addAvatar(formData)
    .then(() => {
      setSubmitting(false);
    })
    .then(() => {
      setActive("Your Profile");
    });
  };
  return (
    <div>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Dropzone
                setFile={setFile}
                square={true}
                defaultAttach={user?.avatar}
              ></Dropzone>
              <Button loading={submitting} className="mainButton" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default ProfileAvatar;
