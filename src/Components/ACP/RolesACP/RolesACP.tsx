import React, { useContext, useEffect } from "react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import RolesList from "./RolesList/RolesList";
import "../adminPanel.css";
import AdminPanel from "../AdminPanel";

const UsersACP = () => {
  const store = useContext(Store);
  const { loadRoles } = store.userStore;

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  return (
    <AdminPanel currentPage="Roles">
      <RolesList />
    </AdminPanel>
  );
};

export default observer(UsersACP);
