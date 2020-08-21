import React from "react";
import { Card, Button, Grid } from "semantic-ui-react";
import { IRole } from "../../../../../Models/role";
import "./rolesCard.css";
import { Link } from "react-router-dom";

interface IProps {
  role: IRole;
}

const RolesCard: React.FC<IProps> = ({ role }) => {
  return (
    <Card>
      <Card.Content>
        <Grid columns="equal">
          <Grid.Column className="roleCardTitle">
            <h4>{role.name}</h4>
          </Grid.Column>
          <Grid.Column>
            <Button className="mainButton" floated="right" as={Link} to={"/admin-console/roles/" + role.id}>View</Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default RolesCard;
