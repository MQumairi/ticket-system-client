import React, { useContext } from "react";
import { IUser } from "../../../../Models/user";
import "./rolesManager.css";
import { Grid, Button } from "semantic-ui-react";
import Store from "../../../App/Store/rootStore";
import { IRoleForm } from "../../../../Models/roleForm";

interface IProps {
  user: IUser;
  roleName: string;
}

const RolesManagerUserItem: React.FC<IProps> = ({ user, roleName}) => {

    const store = useContext(Store)
    const {unassignRole, loadCurrentRole, currentRole} = store.userStore;

  const handleUnassignRole = () => {
      
    let roleToUnassign : IRoleForm = {
        role_name: roleName
    }

      unassignRole(user.id!, roleToUnassign).then(() => {
        loadCurrentRole(currentRole!.id);
      });
  };

  return (
    <div className="rolesUserItem">
      <Grid>
        <Grid.Column width={12}>
          <p>{user.username}</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button floated="right" className="mainButton" onClick={() => handleUnassignRole()}>
            Unassign
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RolesManagerUserItem;
