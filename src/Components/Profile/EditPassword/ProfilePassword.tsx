import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import Store from "../../App/Store/rootStore";
import { IUserForm } from "../../../Models/userForm";

interface IProps {
  setActive: (active: string) => void;
}

const ProfilePassword: React.FC<IProps> = ({ setActive }) => {
  const store = useContext(Store);
  const { editProfile } = store.userStore;

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);
    const password_obj: IUserForm = {
      current_password: values.current_password,
      new_password: values.new_password,
    };

    editProfile(password_obj)
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
              <Field
                inputLabel="Current Password"
                name="current_password"
                placeholder="Current Password"
                component={TextInput}
                type="password"
              ></Field>
              <Field
                inputLabel="New Password"
                name="new_password"
                placeholder="New Password"
                component={TextInput}
                type="password"
              ></Field>

              <Button loading={submitting} className="mainButton ticketNewSubmit" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default ProfilePassword;
