import React, { useContext, useEffect, useState } from "react";
import Store from "../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Card, Button } from "semantic-ui-react";
import RolesCard from "./RolesCard/RolesCard";
import RolesNewForm from "./RolesNewForm";

const RolesList = () => {
  const store = useContext(Store);
  const { loadRoles, roles } = store.userStore;

    const [addingRole, setAddingRole] = useState<boolean>(false);

  useEffect(() => {
    console.log("renders");
    loadRoles();
  }, [loadRoles]);

  return (
    <div>
      <Card.Group itemsPerRow={2}>
        {Array.from(roles).map(([key, role]) => {
          return (
            <RolesCard role={role} key={key}>
              {role.name}
            </RolesCard>
          );
        })}
      </Card.Group>
      <div className="acpAddButton">
      <hr/>
      {!addingRole && <Button className="mainButton addRoleButton" content="Add Role" onClick={() => setAddingRole(true)}/>}
      {addingRole && <RolesNewForm setAddingRole={setAddingRole}/>}
      </div>
    </div>
  );
};

export default observer(RolesList);
