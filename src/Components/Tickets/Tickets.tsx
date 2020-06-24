import React from "react";
import FilterByDashboard from "./FilterByDashboard/FilterByDashboard";
import TicketDashboard from "./TicketsDashboard/TicketDashboard";
import { Grid } from "semantic-ui-react";
import "./tickets.css";

const Tickets = () => {
  return (
    <div>
      <Grid columns={2} id="ticketDashboardGrid">
        <Grid.Column width={3} id="filterCol">
          <FilterByDashboard />
        </Grid.Column>
        <Grid.Column width={13} id="ticketsCol">
          <TicketDashboard />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Tickets;
