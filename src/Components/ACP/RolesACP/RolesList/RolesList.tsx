import React, { useContext, useEffect } from "react";
import Store from "../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Card } from "semantic-ui-react";
import RolesCard from "./RolesCard/RolesCard";

const RolesList = () => {
  const store = useContext(Store);
  const { loadRoles, roles } = store.userStore;

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
    </div>
  );
};

export default observer(RolesList);
