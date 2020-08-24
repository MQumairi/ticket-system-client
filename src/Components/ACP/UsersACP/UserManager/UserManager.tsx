import React, { useState, useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Avatar from "../../../Users/Avatar/Avatar";
import UserManagerEdit from "./UserManagerEdit";
import "./userManager.css";
import { RouteComponentProps, Link } from "react-router-dom";
import Store from "../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";

interface params {
  id: string;
}
const UserManager: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const [editingUserMode, setEditingUserMode] = useState<boolean>(false);

  const store = useContext(Store);
  const { inspectedUser, loadInspectedUser, deleteAvatar } = store.userStore;

  useEffect(() => {
    loadInspectedUser(match.params.id);
  }, [loadInspectedUser, match.params.id]);

  const handleDeleteAvatar = () => {
    if (inspectedUser && inspectedUser.avatar) {
      deleteAvatar(inspectedUser.avatar.id).then(() => {
        loadInspectedUser(match.params.id);
      });
    }
  };

  return (
    <div className="userManagerBody">
      {!editingUserMode && <Button
            content="Back"
            className="mainButton"
            as={Link}
            to="/acp/users"
            floated="right"
          />}
      {inspectedUser && !editingUserMode && (
        <div>
          <Avatar
            avatar={inspectedUser.avatar}
            diameter={120}
            borderWidth={3}
          />

          <div className="acpUserDefault">
            <div className="acpUserData">
              <label>Name</label>
              <p>
                {inspectedUser?.first_name} {inspectedUser?.surname}
              </p>

              <label>Username</label>
              <p>{inspectedUser?.username}</p>

              <label>Email</label>
              <p>{inspectedUser?.email}</p>
            </div>

            <div className="managementButtons">
              <Button
                className="mainButton fullWidth userManagerButton"
                onClick={() => setEditingUserMode(true)}
              >
                Edit User
              </Button>
              {inspectedUser.avatar && (
                <Button
                  className="mainButton fullWidth userManagerButton"
                  onClick={() => handleDeleteAvatar()}
                >
                  Delete Avatar
                </Button>
              )}
              <Button
                className="mainButton fullWidth userManagerButton"
                onClick={() =>
                  history.push(
                    "/acp/users/" + inspectedUser.id + "/delete"
                  )
                }
              >
                Delete User
              </Button>
            </div>
          </div>
        </div>
      )}

      {inspectedUser && editingUserMode && (
        <UserManagerEdit
          user={inspectedUser}
          setEditingUserMode={setEditingUserMode}
        />
      )}
    </div>
  );
};

export default observer(UserManager);
