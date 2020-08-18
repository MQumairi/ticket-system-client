import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Store from "../../App/Store/rootStore";

const ProfileDefault = () => {
  const store = useContext(Store);
  const { user } = store.userStore;

  return (
    <div id="userData">
      <label>Name</label>
      <p>
        {user?.first_name} {user?.surname}
      </p>

      <label>Username</label>
      <p>{user?.username}</p>

      <label>Email</label>
      <p>{user?.email}</p>
    </div>
  );
};

export default observer(ProfileDefault);
