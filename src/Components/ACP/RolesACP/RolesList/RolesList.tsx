import React, { useContext, useEffect } from "react";
import Store from "../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Card, Button } from "semantic-ui-react";
import RolesCard from "./RolesCard/RolesCard";
import LoadingComp from "../../../Utility/Loader/LoadingComp";
import { Link } from "react-router-dom";

const RolesList = () => {
  const store = useContext(Store);
  const { loadRoles, roles } = store.userStore;
  const { resourceLoading, width } = store.commonStore;

  useEffect(() => {
    console.log("renders");
    loadRoles();
  }, [loadRoles]);

  if (resourceLoading)
    return <LoadingComp loadingText="Loading Roles"></LoadingComp>;

  return (
    <div>
      <Card.Group itemsPerRow={width < 768 ? 1: 2}>
        {Array.from(roles.values())
          .slice().sort((r1, r2) => ("" + r1.name).localeCompare(r2.name))
          .map((role) => {
            return (
              <RolesCard role={role} key={role.id}>
                {role.name}
              </RolesCard>
            );
          })}
      </Card.Group>
      <div className="acpAddButton">
        <hr />
        <Button
          className="mainButton addRoleButton"
          content="Add Role"
          as={Link}
          to="/acp/roles/new"
        />
      </div>
    </div>
  );
};

export default observer(RolesList);
