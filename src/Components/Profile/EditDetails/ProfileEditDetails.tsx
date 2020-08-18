import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../Utility/Final Form Fields/TextInput";
import { observer } from "mobx-react-lite";
import Store from "../../App/Store/rootStore";
import { IUserFormGeneral } from "../../../Models/userFormGeneral";

interface IProps {
  setActive: (active: string)=> void;
}

const ProfileEditDetails: React.FC<IProps> = ({setActive}) => {
  const store = useContext(Store);
  const { user, editProfile } = store.userStore;

  const handleFinalFormSubmit = (values: any) => {
    
    let profileDetails: IUserFormGeneral = {
      username: values.username,
      first_name: values.first_name,
      surname: values.surname,
      email: values.email,
    };
    
    editProfile(profileDetails).then(() => {
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

export default observer(ProfileEditDetails);
