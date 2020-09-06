import React, { useContext, useEffect } from "react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import StatusList from "./StatusList/StatusList";
import "../adminPanel.css";
import AdminPanel from "../AdminPanel";

const UsersACP = () => {
  const store = useContext(Store);
  const { loadUserList } = store.userStore;

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <AdminPanel currentPage="Statuses">
      <StatusList />
    </AdminPanel>
  );
};

export default observer(UsersACP);
