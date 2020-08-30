import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, GridColumn, Grid } from "semantic-ui-react";
import TextInput from "../Utility/Final Form Fields/TextInput";
import Store from "../App/Store/rootStore";
import { IUserForm } from "../../Models/userForm";
import "./registerPage.css";
import { Link } from "react-router-dom";
import {
  combineValidators,
  composeValidators,
  isRequired,
  isAlphabetic,
  matchesPattern,
  hasLengthGreaterThan,
} from "revalidate";
import PasswordRequirments from "../Utility/Password Requirements/PasswordRequirments";

const RegisterPage = () => {

  const store = useContext(Store);
  const { register } = store.userStore;

  const validate = combineValidators({
    first_name: composeValidators(
      isRequired({ message: "Add a first name" }),
      isAlphabetic({ message: "Can only contain letters" })
    )(),
    surname: composeValidators(
      isRequired({ message: "Add a surname" }),
      isAlphabetic({ message: "Can only contain letters" })
    )(),
    username: composeValidators(
      isRequired({ message: "Add a username" }),
      matchesPattern(/^[a-zA-Z0-9]+$/)
    )({ message: "Can only contain letters and numbers" }),
    email: composeValidators(
      isRequired({ message: "Add an email" }),
      matchesPattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    )({ message: "Doesn't match email format" }),
    password: composeValidators(
      isRequired({ message: "Enter a password" }),
      hasLengthGreaterThan(7)({
        message: "A valid password must be 8 or more characters long",
      }),
      matchesPattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/
      )({ message: "Your password doesn't satisfy all requirments" })
    )(),
  });

  const handleFinalFormSubmit = (values: IUserForm) => {
    register(values);
  };

  return (
    <div>
      <div>
        <FinalForm
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => {
            return (
              <div className="register-page-body">
                <Grid>
                  <GridColumn width={5} key={1}>
                    <h2>Register</h2>
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
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths="equal">
                    <Field
                      inputLabel="First Name"
                      name="first_name"
                      placeholder="First Name"
                      component={TextInput}
                    />
                    <Field
                      inputLabel="Surname"
                      name="surname"
                      placeholder="Surname"
                      component={TextInput}
                    />
                  </Form.Group>
                  <Field
                    type="email"
                    inputLabel="Email"
                    name="email"
                    placeholder="Email"
                    component={TextInput}
                  />
                  <Field
                    inputLabel="Username"
                    name="username"
                    placeholder="Username"
                    component={TextInput}
                  />
                  <PasswordRequirments/>
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
                    Register
                  </Button>
                </Form>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
