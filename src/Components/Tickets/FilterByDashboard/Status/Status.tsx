import React from "react";
import { Grid } from "semantic-ui-react";
import StatusIcon from "./StatusIcon/SatusIcon";
import "./status.css";

const Status = () => {

  return (
    <div>
      <h4 className="filterTitle">Status</h4>
      <Grid columns={2} className="styleGrid">
        <Grid.Row className="styleRow">
          <Grid.Column className="styleColumn">
            <StatusIcon iconName={"urgentIcon"} clickAble = {true} content="Urgent"/>
          </Grid.Column>
          <Grid.Column className="styleColumn">
            <StatusIcon iconName={"lowIcon"} clickAble = {true} content="Low" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="styleRow">
          <Grid.Column className="styleColumn">
            <StatusIcon iconName={"pendingIcon"} clickAble = {true} content="Pending" />
          </Grid.Column>
          <Grid.Column className="styleColumn">
            <StatusIcon iconName={"doneIcon"} clickAble = {true} content="Done" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Status;
