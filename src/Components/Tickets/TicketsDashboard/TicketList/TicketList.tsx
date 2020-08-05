import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";
// import { history } from "react-router";

const TicketList = () => {

  const store = useContext(Store);
  const { filteredTickets, loadFilteredTickets, ticketsRegistry} = store.filterStore;

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
