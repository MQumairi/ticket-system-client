import React, { useContext } from "react";
import Store from "../../../App/Store/rootStore";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard/UserCard";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../../Utility/Loader/LoadingComp";

const UserList = () => {
  const store = useContext(Store);
  const { userList } = store.userStore;
  const { resourceLoading, width } = store.commonStore;

  if (resourceLoading)
    return <LoadingComp loadingText="Loading Users"></LoadingComp>;

  return (
    <Card.Group itemsPerRow={width < 768 ? 2 : 3}>
      {Array.from(userList.values())
        .slice()
        .sort((u1, u2) => ("" + u1.username).localeCompare(u2.username))
        .map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
    </Card.Group>
  );
};

export default observer(UserList);
