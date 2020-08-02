import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  const { filteredTickets, selectAll } = store.filterStore;
  const { loadTickets } = store.ticketStore;

  useEffect(() => {
    selectAll();
  }, [loadTickets]);

  return (
    <div id="ticketList">
      {Array.from(filteredTickets).map(([numer, ticket]) => {
        return <TicketItem key={ticket.post_id} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
