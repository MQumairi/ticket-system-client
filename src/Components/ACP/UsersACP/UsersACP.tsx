import React, { useContext, useState } from "react";
import "./usersACP.css";
import { Card } from "semantic-ui-react";
import Store from "../../App/Store/rootStore";
import UserCard from "./UserCard/UserCard";
import { observer } from "mobx-react-lite";
import { IUser } from "../../../Models/user";
import UserManager from "./UserManager/UserManager";

const UsersACP = () => {
  const store = useContext(Store);
  const { userList } = store.userStore;

  const [managedUser, setManagedUser] = useState<IUser | null>(null);

  if (!managedUser) {
    return (
      <Card.Group itemsPerRow={3}>
        {Array.from(userList).map(([key, user]) => {
          return <UserCard key={key} user={user} setManagedUser={setManagedUser} />;
        })}
      </Card.Group>
    );
  } else {
      return (<UserManager user={managedUser} setManagedUser={setManagedUser}/>)
  }

};

export default observer(UsersACP);
