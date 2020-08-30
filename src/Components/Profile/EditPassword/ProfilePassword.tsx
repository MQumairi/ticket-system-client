import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import Store from "../../App/Store/rootStore";
import { IUserForm } from "../../../Models/userForm";
import PasswordRequirments from "../../Utility/Password Requirements/PasswordRequirments";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan, matchesPattern } from "revalidate";

interface IProps {
  setActive: (active: string) => void;
}

const ProfilePassword: React.FC<IProps> = ({ setActive }) => {
  const store = useContext(Store);
  const { editProfile } = store.userStore;

  const [submitting, setSubmitting] = useState<boolean>(false);

  //Don't forget to pass this into FinalForm as validate={validate}, 
    //and destructure params of render prop (handleSubmit, invalid, pristine)
    //then set the submit button to disabled if invalid or pristine
    const validate = combineValidators({
      current_password: composeValidators(isRequired({ message: "Enter your current password" }), hasLengthGreaterThan(7)({message: "A valid password must be 8 or more characters long"}), matchesPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)({message: "Your password doesn't satisfy all requirments"}))(),
      new_password: composeValidators(isRequired({ message: "Enter a new password" }), hasLengthGreaterThan(7)({message: "A valid password must be 8 or more characters long"}), matchesPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)({message: "Your password doesn't satisfy all requirments"}))()
    });

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
      <PasswordRequirments/>
      <FinalForm
      validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => {
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

              <Button disabled={invalid || pristine} loading={submitting} className="mainButton ticketNewSubmit" type="submit">
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
