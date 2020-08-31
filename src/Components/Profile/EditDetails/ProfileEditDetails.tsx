import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import { observer } from "mobx-react-lite";
import Store from "../../App/Store/rootStore";
import { IUserFormGeneral } from "../../../Models/userFormGeneral";
import { combineValidators, isRequired, composeValidators, isAlphabetic, matchesPattern } from "revalidate";

interface IProps {
  setActive?: (active: string) => void;
}

const ProfileEditDetails: React.FC<IProps> = ({ setActive }) => {
  const store = useContext(Store);
  const { user, editProfile } = store.userStore;

  const [editing, setEditing] = useState<boolean>(false);

  const validate = combineValidators({
    first_name: composeValidators(isRequired({ message: "Add a first name" }), isAlphabetic({message: "Can only contain letters"}))(),
    surname: composeValidators(isRequired({ message: "Add a surname" }), isAlphabetic({message: "Can only contain letters"}))(),
    username: composeValidators(isRequired({ message: "Add a username" }), matchesPattern(/^[a-zA-Z0-9]+$/))({message: "Can only contain letters and numbers"}),
    email: composeValidators(isRequired({ message: "Add an email" }), matchesPattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))({message: "Doesn't match email format"})
  });

  const handleFinalFormSubmit = (values: any) => {
    setEditing(true);

    let profileDetails: IUserFormGeneral = {
      username: values.username,
      first_name: values.first_name,
      surname: values.surname,
      email: values.email,
    };

    editProfile(profileDetails)
      .then(() => {
        user!.username = profileDetails!.username!;
        user!.first_name = profileDetails.first_name!;
        user!.surname = profileDetails.surname!;
        user!.email = profileDetails.email!;
      })
      .then(() => {
        setEditing(false);
      })
  };

  return (
    <div>
      <FinalForm
        validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Field
                  component={TextInput}
                  name="first_name"
                  placeholder="First name"
                  inputLabel="First name"
                  initialValue={user?.first_name}
                />
                <Field
                  component={TextInput}
                  name="surname"
                  placeholder="Surname"
                  inputLabel="Surname"
                  initialValue={user?.surname}
                />
              </Form.Group>
              <Field
                component={TextInput}
                name="username"
                placeholder="Username"
                inputLabel="Username"
                initialValue={user?.username}
              />
              <Field
                component={TextInput}
                name="email"
                placeholder="Email"
                inputLabel="Email"
                type="email"
                initialValue={user?.email}
              />
              <Button
                disabled={invalid || pristine}
                loading={editing}
                className="mainButton ticketNewSubmit"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default observer(ProfileEditDetails);
