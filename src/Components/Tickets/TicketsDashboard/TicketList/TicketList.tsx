import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  // const {ticketsRegistry} = store.ticketStore;
  const { filteredTickets, loadFilteredTickets, ticketsRegistry} = store.filterStore;
  // const { loadTickets } = store.ticketStore;

  useEffect(() => {
    loadFilteredTickets(ticketsRegistry);
  }, [ticketsRegistry, loadFilteredTickets]);

  return (
    <div id="ticketList">
      {Array.from(filteredTickets).map(([number, ticket]) => {
        return <TicketItem key={ticket.post_id} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
