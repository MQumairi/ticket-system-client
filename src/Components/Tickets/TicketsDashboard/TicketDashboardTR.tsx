import React from "react";
import { Grid } from "semantic-ui-react";

const TicketDashboardTR = () => {
  return (
    <div className="ticketsTR">
      <hr/>
    <Grid columns={6} id="ticketsHeader">
      <Grid.Column width={2} className="remove-padding table-header">
        Author
      </Grid.Column>
      <Grid.Column width={3} className="remove-padding table-header">
        Status
      </Grid.Column>
      <Grid.Column width={2} className="remove-padding table-header">
        Product
      </Grid.Column>
      <Grid.Column width={4} className="remove-padding table-header">
        Title
      </Grid.Column>
      <Grid.Column width={3} className="remove-padding table-header">
        Date
      </Grid.Column>
      <Grid.Column
        width={2}
        className="remove-padding table-header"
      ></Grid.Column>
    </Grid>
    <hr/>
    </div>
  );
};

export default TicketDashboardTR;
