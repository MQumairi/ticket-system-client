import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import Store from "../../App/Store/rootStore";
import { IUserForm } from "../../../Models/userForm";

interface IProps {
  setActive: (active: string)=>void
}

const ProfilePassword: React.FC<IProps> = ({setActive}) => {
  const store = useContext(Store);
  const { editProfile } = store.userStore;

  const handleFinalFormSubmit = (values: any) => {

    const password_obj: IUserForm = {
      current_password: values.current_password,
      new_password: values.new_password,
    };

    editProfile(password_obj).then(() => {
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

              <Button className="mainButton ticketNewSubmit" type="submit">
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
