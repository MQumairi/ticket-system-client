import React from "react";
import "./roleCreator.css";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RoleCreatorForm from "./RoleCreatorForm";

const RoleCreator = () => {
  return (
    <div className="roleCreatorBody">
      <Grid>
        <GridColumn width={14}>
          <h2>Create Role</h2>
        </GridColumn>
        <GridColumn width={2}>
          <Button className="mainButton roleBackButton" content="Back" floated="right" as={Link} to="/acp/roles"/>
        </GridColumn>
      </Grid>
      <hr/>
      <RoleCreatorForm/>
    </div>
  );
};

export default RoleCreator;
