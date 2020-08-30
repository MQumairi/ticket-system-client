import React, { useContext, useEffect } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, GridColumn, Grid } from "semantic-ui-react";
import TextInput from "../Utility/Final Form Fields/TextInput";
import Store from "../App/Store/rootStore";
import { IUserForm } from "../../Models/userForm";
import "./loginPage.css";
import { Link } from "react-router-dom";
import {
  combineValidators,
  composeValidators,
  isRequired,
  matchesPattern,
} from "revalidate";
import { observer } from "mobx-react-lite";
import ErrorNotice from "../Utility/Error Notice/ErrorNotice";

const LoginPage = () => {
  const store = useContext(Store);
  const { login, loginError, setLoginError } = store.userStore;

  const handleFinalFormSubmit = (values: IUserForm) => {
    login(values).catch((e) => {
      setLoginError(true);
      console.log("Caught a login error");
    });
  };

  useEffect(() => {
    console.log("Login error = " + loginError);
  }, [loginError]);

  const validate = combineValidators({
    email: composeValidators(
      isRequired({ message: "Add an email" }),
      matchesPattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    )({ message: "Doesn't match email format" }),
    password: composeValidators(isRequired({ message: "Enter a password" }))(),
  });

  return (
    <div>
      <FinalForm
        validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => {
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
              {loginError && (
                <ErrorNotice message={"Email/Password combination unrecognized. Try again."} />
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
                <Button
                  disabled={invalid || pristine}
                  className="mainButton ticketNewSubmit"
                  type="submit"
                >
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

export default observer(LoginPage);
