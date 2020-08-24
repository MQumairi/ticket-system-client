import React from "react";
import { IUser } from "../../../../Models/user";
import { Grid, GridColumn, Button, Form } from "semantic-ui-react";
import Avatar from "../../../Users/Avatar/Avatar";
import { IUserFormGeneral } from "../../../../Models/userFormGeneral";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import Store from "../../../App/Store/rootStore";
import { useContext } from "react";

interface IProps {
  user: IUser;
  setEditingUserMode: (editingUserMode: boolean) => void;
}

const UserManagerEdit: React.FC<IProps> = ({ user, setEditingUserMode }) => {
  const store = useContext(Store);
  const { editUser, loadUserList } = store.userStore;

  const handleFinalFormSubmit = (values: any) => {
    let userDetails: IUserFormGeneral = {
      username: values.username,
      first_name: values.first_name,
      surname: values.surname,
      email: values.email,
    };

    console.log(userDetails);

    editUser(user.id!, userDetails)
      .then(() => {
        loadUserList();
      })
      .then(() => {
          user.first_name = userDetails.first_name!;
          user.surname = userDetails.surname!;
          user.username = userDetails.username!;
          user.email = userDetails.email!;
      })
      .then(() => {
        setEditingUserMode(false);
      });
  };

  return (
    <div>
      <Grid>
        <GridColumn width={13}>
          <Avatar avatar={user.avatar} diameter={120} borderWidth={3} />

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
        </GridColumn>
        <GridColumn width={3}>
          <Button
            content="Back"
            onClick={() => {
              setEditingUserMode(false);
            }}
            className="mainButton"
          />
        </GridColumn>
      </Grid>
    </div>
  );
};

export default UserManagerEdit;
