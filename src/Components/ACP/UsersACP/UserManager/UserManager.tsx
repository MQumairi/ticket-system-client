import React, { useState, useContext } from "react";
import { IUser } from "../../../../Models/user";
import { Grid, GridColumn, Button } from "semantic-ui-react";
import Avatar from "../../../Users/Avatar/Avatar";
import UserManagerEdit from "./UserManagerEdit";
import "./userManager.css";
import { useHistory } from "react-router-dom";
import Store from "../../../App/Store/rootStore";

interface IProps {
  user: IUser;
  setManagedUser: (user: IUser | null) => void;
}

const UserManager: React.FC<IProps> = ({ user, setManagedUser }) => {
  let history = useHistory();

  const [editingUserMode, setEditingUserMode] = useState<boolean>(false);

  const store = useContext(Store);
  const { loadUserList, deleteAvatar } = store.userStore;

  const handleDeleteAvatar = () => {

    if (user.avatar) {

      deleteAvatar(user.avatar.id)
      .then(() => {
        loadUserList();
      })
      .then(() => {
        setManagedUser(null);
      });
    }

  };

  return (
    <div>
      {!editingUserMode && (
        <Grid>
          <GridColumn width={13}>
            <Avatar avatar={user.avatar} diameter={120} borderWidth={3} />

            <div className="acpUserDefault">
              <div className="acpUserData">
                <label>Name</label>
                <p>
                  {user?.first_name} {user?.surname}
                </p>

                <label>Username</label>
                <p>{user?.username}</p>

                <label>Email</label>
                <p>{user?.email}</p>
              </div>

              <div className="managementButtons">
                <Button
                  className="mainButton"
                  onClick={() => setEditingUserMode(true)}
                >
                  Edit User
                </Button>
                {user.avatar && (
                  <Button
                    className="mainButton"
                    onClick={() => handleDeleteAvatar()}
                  >
                    Delete Avatar
                  </Button>
                )}
                <Button
                  className="mainButton"
                  onClick={() =>
                    history.push("/admin-console/users/" + user.id + "/delete")
                  }
                >
                  Delete User
                </Button>
              </div>
            </div>
          </GridColumn>
          <GridColumn width={3}>
            <Button
              content="Back"
              onClick={() => {
                setManagedUser(null);
              }}
              className="mainButton"
            />
          </GridColumn>
        </Grid>
      )}

      {editingUserMode && (
        <UserManagerEdit user={user} setEditingUserMode={setEditingUserMode} />
      )}
    </div>
  );
};

export default UserManager;
