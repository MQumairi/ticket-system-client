import React, { useContext } from 'react'
import Store from '../../../App/Store/rootStore';
import RolesManagerUserItem from "./RolesManagerUserItem";
import LoadingComp from '../../../Utility/Loader/LoadingComp';

const RoleManagerUserList = () => {

    const store = useContext(Store);
    const {currentRole: role} = store.userStore;

    const {resourceLoading} = store.commonStore;

    if(resourceLoading) return (<LoadingComp loadingText="Loading Users"></LoadingComp>)

    return (
        <div>
          <label>Users currently in role:</label>
          {Array.from(role!.roleUsers).slice().sort((u1, u2) => ('' + u1.username).localeCompare(u2.username)).map((user) => {
            return (
              <RolesManagerUserItem
                user={user}
                key={user.id}
                roleName={role!.name}
              />
            );
          })}
          </div>
    )
}

export default RoleManagerUserList
