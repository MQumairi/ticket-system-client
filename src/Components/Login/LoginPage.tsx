import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label, GridColumn, Grid } from "semantic-ui-react";
import TextInput from "../Utility/Final Form Fields/TextInput";
import Store from "../App/Store/rootStore";
import { IUserForm } from "../../Models/userForm";
import "./loginPage.css";
import { Link, useHistory } from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();

  const store = useContext(Store);
  const { login } = store.userStore;

  const [error, setError] = useState(null);

  const handleFinalFormSubmit = (values: IUserForm) => {
    login(values)
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, submitError }) => {
          return (
            <div className="login-page-body">
              <Grid>
                <GridColumn width={5} key={1}>
                  <h2>Login</h2>
                </GridColumn>
                <GridColumn width={7} key={2} />
                <GridColumn width={3} key={3}>
                  <Button
                    className="mainButton"
                    content="Back"
                    as={Link}
                    to="/"
                  />
                </GridColumn>
              </Grid>
              <hr />
              {!!error && (
                <Label
                  className="login-error-label"
                  color="red"
                  basic
                  content={"Email/Password combination incorrect. Try again."}
                />
              )}
              <Form onSubmit={handleSubmit}>
                <Field
                  inputLabel="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={TextInput}
                />
                <Field
                  inputLabel="Password"
                  name="password"
                  placeholder="Password"
                  component={TextInput}
                  type="password"
                />
                <Button className="mainButton ticketNewSubmit" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LoginPage;
