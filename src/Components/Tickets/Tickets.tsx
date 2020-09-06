import React, { useEffect, useContext } from "react";
import FilterByDashboard from "./FilterByDashboard/FilterByDashboard";
import TicketDashboard from "./TicketsDashboard/TicketDashboard";
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
      <div id="ticketsPageBody">
        <div id="filterCol">
          <FilterByDashboard />
        </div>
        <div id="ticketsCol">
          <TicketDashboard />
        </div>
      </div>
    </div>
  );
};

export default observer(Tickets);
