import React, { useEffect, useContext } from "react";
import { Grid, GridColumn, Button } from "semantic-ui-react";
import RoleCreatorForm from "../RoleCreator/RoleCreatorForm";
import { Link, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Store from "../../../../App/Store/rootStore";

interface params {
  id: string;
}
//Don't forget to make component derive from : React.FC<RouteComponentProps<params>>

const RoleEditor: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { loadCurrentRole, currentRole } = store.userStore;

  useEffect(() => {
    loadCurrentRole(match.params.id);
    //Logic goes here
  }, [loadCurrentRole, match.params.id]);
  return (
    <div className="roleCreatorBody">
      <Grid>
        <GridColumn width={14}>
          <h2>Edit Role</h2>
        </GridColumn>
        <GridColumn width={2}>
          <Button
            className="mainButton roleBackButton"
            content="Back"
            floated="right"
            as={Link}
            to={"/acp/roles/" + match.params.id}
          />
        </GridColumn>
      </Grid>
      <hr />
      {currentRole && <RoleCreatorForm role={currentRole} />}
    </div>
  );
};

export default observer(RoleEditor);
