import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Store from "../../../App/Store/rootStore";

interface params {
  id: string;
}

const RolesManager: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { currentRole: role, loadCurrentRole } = store.userStore;

  useEffect(() => {
    loadCurrentRole(match.params.id);
  }, [loadCurrentRole, match.params]);

  return <div>{role && <div>{role.name}</div>}</div>;
};

export default RolesManager;
