import React, { useEffect, useContext } from "react";
import FilterByDashboard from "./FilterByDashboard/FilterByDashboard";
import TicketDashboard from "./TicketsDashboard/TicketDashboard";
import { Grid } from "semantic-ui-react";
import "./tickets.css";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const Tickets = () => {
  const store = useContext(Store);
  const { loadTickets, loadFilteredTickets } = store.ticketStore;
  const { loadStatuses } = store.statusStore;
  const { loadProducts } = store.productStore;
  const {isFiltered, filters} = store.filterStore;

  useEffect(() => {
    if(!isFiltered) {
      console.log("loading tickets normally")
      loadTickets();
    } else {
      console.log("loading tickets filtered")
      console.log(toJS(filters));
      loadFilteredTickets(filters)
    }
    loadStatuses();
    loadProducts();
  }, [loadTickets, isFiltered, loadFilteredTickets, filters, loadStatuses, loadProducts]);

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
