import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../../Utility/Final Form Fields/TextInput";
import CheckBox from "../../../../Utility/Final Form Fields/CheckBox";
import ErrorNotice from "../../../../Utility/Error Notice/ErrorNotice";
import { IRole } from "../../../../../Models/role";
import { IRoleForm } from "../../../../../Models/roleForm";
import Store from "../../../../App/Store/rootStore";
import { history } from "../../../../../index";
import { observer } from "mobx-react-lite";
import { combineValidators, isRequired } from "revalidate";

interface IProps {
  role?: IRole;
}

const RoleCreatorForm: React.FC<IProps> = ({ role }) => {
  const store = useContext(Store);
  const { addRole, editRole } = store.userStore;

  const [roleFormSubmitting, setRoleFormSubmitting] = useState<boolean>(false);

  //Don't forget to pass this into FinalForm as validate={validate},
  //and destructure params of render prop (handleSubmit, invalid, pristine)
  //then set the submit button to disabled if invalid or pristine
  const validate = combineValidators({
    role_name: isRequired({ message: "A name is required for the role" }),
  });

  const handleFinalFormSubmit = (values: any) => {
    setRoleFormSubmitting(true);
    if (values.can_manage === undefined) values.can_manage = false;
    if (values.can_moderate === undefined) values.can_moderate = false;

    if (!role) {
      let roleToAdd: IRoleForm = {
        role_name: values.role_name,
        can_manage: values.can_manage,
        can_moderate: values.can_moderate,
      };
      addRole(roleToAdd)
        .then(() => {
          setRoleFormSubmitting(false);
        })
        .then(() => {
          history.push("/acp/roles");
        });
    } else {
      //Else
      let roleToEdit: IRoleForm = {
        role_name: values.role_name,
        can_manage: values.can_manage,
        can_moderate: values.can_moderate,
      };

      console.log(roleToEdit);

      editRole(role.id, roleToEdit)
        .then(() => {
          setRoleFormSubmitting(false);
        })
        .then(() => {
          history.push("/acp/roles/" + role.id);
        });
    }
  };

  return (
    <div>
      <FinalForm
      validate={validate}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                name="role_name"
                placeholder="Role Name"
                component={TextInput}
                inputLabel="Role Name"
                defaultValue={role?.name}
                readOnly={role?.name === "Admin" || role?.name === "Developer"}
              ></Field>
              <ErrorNotice
                message={
                  "Set if role members can manage tickets (change their status, assign them to developers, and archive them), or moderate tickets and comments (edit and delete them)."
                }
              />
              <Form.Group widths="equal">
                <Field
                  component={CheckBox}
                  name="can_manage"
                  placeholder="Can Manage"
                  inputLabel="Can Manage"
                  defaultValueCheck={role?.can_manage}
                  disabled={
                    role?.name === "Admin" || role?.name === "Developer"
                  }
                />
                <Field
                  component={CheckBox}
                  name="can_moderate"
                  placeholder="Can Moderate"
                  inputLabel="Can Moderate"
                  defaultValueCheck={role?.can_moderate}
                  disabled={
                    role?.name === "Admin" || role?.name === "Developer"
                  }
                />
              </Form.Group>
              <br />
              <Button
                loading={roleFormSubmitting}
                className="mainButton ticketNewSubmit"
                type="submit"
                disabled={role?.name === "Admin" || role?.name === "Developer" || invalid || pristine}
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

export default observer(RoleCreatorForm);
