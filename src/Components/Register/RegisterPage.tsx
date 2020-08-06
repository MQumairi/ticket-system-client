import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label, GridColumn, Grid } from "semantic-ui-react";
import TextInput from "../Utility/Final Form Fields/TextInput";
import Store from "../App/Store/rootStore";
import { IUserForm } from "../../Models/userForm";
import "./registerPage.css";
import { Link, useHistory } from "react-router-dom";

const RegisterPage = () => {

  let history = useHistory();

  const store = useContext(Store);
//   const { login } = store.userStore;

  const handleFinalFormSubmit = (values: IUserForm) => {
    console.log(values);
  };

  return (
    <div>
      <div>
        <FinalForm
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, submitError }) => {
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
                  <Field
                    name="email"
                    placeholder="Email"
                    component={TextInput}
                  />
                  <Field
                    name="username"
                    placeholder="Username"
                    component={TextInput}
                  />
                  <Field
                    name="password"
                    placeholder="Password"
                    component={TextInput}
                    type="password"
                  />
                  <Button className="mainButton ticketNewSubmit" type="submit">
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
