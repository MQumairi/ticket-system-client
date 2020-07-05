import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  const { filteredTickets } = store.filterStore;
  const { selectAll } = store.filterStore;

  useEffect(() => {
    selectAll();
  }, [selectAll]);

  return (
    <div id="ticketList">
      {filteredTickets.map((ticket) => {
        return <TicketItem key={ticket.id} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
