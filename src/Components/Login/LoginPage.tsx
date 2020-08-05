import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label } from "semantic-ui-react";
import TextInput from "../Utility/Final Form Fields/TextInput";
import Store from "../App/Store/rootStore";
import { IUserForm } from "../../Models/userForm";

const LoginPage = () => {
  const store = useContext(Store);
  const { login } = store.userStore;

  const [error, setError] = useState(null);

  const handleFinalFormSubmit = (values: IUserForm) => {
    login(values).catch((error) => {
      setError(error);
    });
  };

  return (
    <div>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, submitError }) => {
          return (
            <div>
              {!!error && <Label color="red" basic content={"Unauthorized"} />}
              <Form onSubmit={handleSubmit}>
                <Field name="email" placeholder="Email" component={TextInput} />
                <Field
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
