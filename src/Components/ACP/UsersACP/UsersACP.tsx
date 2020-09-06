import React, { useContext, useEffect } from "react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import UserList from "./UserList/UserList";
import "../adminPanel.css";
import AdminPanel from "../AdminPanel";

const UsersACP = () => {
  const store = useContext(Store);
  const { loadUserList } = store.userStore;

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <AdminPanel currentPage="Users">
      <UserList />
    </AdminPanel>
  );
};

export default observer(UsersACP);
