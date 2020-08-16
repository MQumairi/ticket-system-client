import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  const {
    filteredTickets,
    ticketsRegistry,
    loadFilteredTickets,
  } = store.filterStore;

  useEffect(() => {
    loadFilteredTickets();
  }, [ticketsRegistry, loadFilteredTickets]);

  return (
    <div id="ticketList">
      {console.log("rendering filtered tickets, of size " + filteredTickets.size)}
      {Array.from(filteredTickets).map(([number, ticket]) => {
        return <TicketItem key={number} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
