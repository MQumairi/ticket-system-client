import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import Store from "../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import "./rolesManager.css";
import { Button, Grid, Form } from "semantic-ui-react";
import { Field } from "react-final-form";
import SelectInput from "../../../Utility/Final Form Fields/DropdownInput";
import { Form as FinalForm } from "react-final-form";
import RolesManagerUserItem from "./RolesManagerUserItem";
import { IRoleForm } from "../../../../Models/roleForm";
import RolesManagerEditForm from "./RolesManagerEditForm";

interface params {
  id: string;
}

const RolesManager: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const {
    currentRole: role,
    loadCurrentRole,
    loadUserList,
    userOptions,
    currentRoleUsers,
    loadCurrentRoleUsers,
    assignRole,
  } = store.userStore;

  const [editingRole, setEditingRole] = useState<boolean>(false);

  const handleAssignRole = (values: any) => {
    let roleToAssign: IRoleForm = {
      role_name: role!.name,
    };

    assignRole(values.user, roleToAssign).then(() => {
      loadCurrentRoleUsers(role!.name);
    });
  };

  useEffect(() => {
    loadCurrentRole(match.params.id);
    if (role) loadCurrentRoleUsers(role?.name);
    loadUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loadCurrentRole,
    match.params,
    // eslint-disable-next-line
    role?.name,
    loadCurrentRoleUsers,
    loadUserList,
  ]);

  return (
    <div>
      {role && (
        <div className="roleManagerBody">
          <Grid>
            <Grid.Row className="btnRow">
              <Grid.Column width={12} />{" "}
              <Grid.Column width={3}>
                <Button
                  content="Back"
                  as={Link}
                  to="/acp/roles"
                  className="mainButton"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="roleManagerHeader">
            <h1>{role.name}</h1>
          </div>
          <hr />

          <FinalForm
            onSubmit={handleAssignRole}
            render={({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <label>Assign user to the role:</label>
                  <Form.Group widths="equal">
                    <Field
                      component={SelectInput}
                      options={userOptions}
                      name="user"
                      placeholder="User"
                    />
                    <Button
                      className="mainButton ticketNewSubmit"
                      type="submit"
                      content="Assign"
                    />
                  </Form.Group>
                </Form>
              );
            }}
          />
          <hr />

          <label>Users currently in role:</label>
          {Array.from(currentRoleUsers).map(([key, user]) => {
            return (
              <RolesManagerUserItem
                user={user}
                key={key}
                roleName={role.name}
              />
            );
          })}

          <hr className="roleManagerHR" />

          {!editingRole && role.name !== "Admin" && role.name !== "Developer" && <div className="roleManagerButtonGroup">
            <Button className="mainButton rolesManagerBtn" onClick={() => setEditingRole(true)}>Edit Role</Button>
            <Button className="mainButton rolesManagerBtn" as={Link} to={"/acp/roles/" + role.id + "/delete"}>Delete Role</Button>
          </div>}

          {editingRole && <RolesManagerEditForm role={role} setEditingRole={setEditingRole}/>}

        </div>
      )}
    </div>
  );
};

export default observer(RolesManager);
