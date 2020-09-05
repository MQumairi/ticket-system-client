import React, { useEffect, useContext } from "react";
import FilterByDashboard from "./FilterByDashboard/FilterByDashboard";
import TicketDashboard from "./TicketsDashboard/TicketDashboard";
import { Grid } from "semantic-ui-react";
import "./tickets.css";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";

const Tickets = () => {
  const store = useContext(Store);
  const { loadTickets, loadFilteredTickets } = store.ticketStore;
  const { loadStatuses } = store.statusStore;
  const { loadProducts } = store.productStore;
  const {
    isFiltered,
    filters,
    defaultStatuses,
    defaultProducts,
  } = store.filterStore;

  useEffect(() => {
    if (!isFiltered) {
      loadTickets();
    }
    loadStatuses();
    loadProducts();
  }, [
    loadTickets,
    isFiltered,
    defaultStatuses,
    defaultProducts,
    loadFilteredTickets,
    filters,
    loadStatuses,
    loadProducts,
  ]);

  return (
    <div>
      <Grid columns={2} id="ticketDashboardGrid">
        <Grid.Column width={3} id="filterCol">
          <FilterByDashboard />
        </Grid.Column>
        <Grid.Column width={13} id="ticketsCol">
          <div className="dashBoardMain">
            <div className="arrowLeft"></div>
            <TicketDashboard />
            <div className="arrowRight"></div>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(Tickets);
