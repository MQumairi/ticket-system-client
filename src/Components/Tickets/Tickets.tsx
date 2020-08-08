import React, { useEffect, useContext } from "react";
import FilterByDashboard from "./FilterByDashboard/FilterByDashboard";
import TicketDashboard from "./TicketsDashboard/TicketDashboard";
import { Grid } from "semantic-ui-react";
import "./tickets.css";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";

const Tickets = () => {
  const store = useContext(Store);
  const { loadTickets } = store.ticketStore;
  const { loadStatuses } = store.statusStore;
  const { loadProducts } = store.productStore;

  useEffect(() => {
    loadTickets();
    loadStatuses();
    loadProducts();
  }, [loadTickets, loadStatuses, loadProducts]);

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

export default observer(Tickets);
