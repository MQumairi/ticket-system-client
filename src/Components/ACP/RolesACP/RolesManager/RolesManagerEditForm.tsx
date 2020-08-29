import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import Store from "../../../App/Store/rootStore";
import { IRoleForm } from "../../../../Models/roleForm";
import { IRole } from "../../../../Models/role";

interface IProps {
  setEditingRole: (editingRole: boolean) => void;
  role: IRole;
}

const RolesManagerEditForm: React.FC<IProps> = ({ setEditingRole, role }) => {
  const store = useContext(Store);
  const { editRole } = store.userStore;

  const [saving, setSaving] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setSaving(true);

    let roleToEdit: IRoleForm = {
      role_name: values.name,
    };

    editRole(role.id, roleToEdit)
    .then(() => {
      role.name = roleToEdit.role_name;
    })
    .then(() => {
      setSaving(false);
    })
    .then(() => {
      setEditingRole(false);
    })
  };

  return (
    <div>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                name="name"
                placeholder="Role Name"
                component={TextInput}
                inputLabel="Change the Role's name"
                initialValue={role.name}
              ></Field>
              <Form.Group widths="equal">
                <Button
                  className="mainButton fullWidth"
                  type="submit"
                  content="Save"
                  loading={saving}
                />
                <Button
                  className="mainButton fullWidth"
                  type="submit"
                  content="Cancel"
                  onClick={() => setEditingRole(false)}
                />
              </Form.Group>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default RolesManagerEditForm;
