import React, { useContext } from "react";
import Store from "../../../App/Store/rootStore";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard/UserCard";
import { observer } from "mobx-react-lite";

const UserList = () => {
  const store = useContext(Store);
  const { userList } = store.userStore;

  return (
    <Card.Group itemsPerRow={3}>
      {Array.from(userList.values()).sort((u1, u2) => ('' + u1.username).localeCompare(u2.username)).map((user) => {
        return (
          <UserCard key={user.id} user={user} />
        );
      })}
    </Card.Group>
  );
};

export default observer(UserList);
