import React, { useContext, useEffect } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  const { filteredTickets, tickets } = store.filterStore;
  const { tickets: ticketspriv } = store.ticketStore;
  const { selectAll } = store.filterStore;

  useEffect(() => {
    console.log("-------------");
    console.log("From: TicketList.tsx");
    console.log(tickets);
    console.log(filteredTickets);
    console.log(ticketspriv);
    console.log("-------------");

    // let location = useLocation();
    // console.log(location.state.from.pathname)
    selectAll();

  });

  return (
    <div id="ticketList">
      {filteredTickets.map((ticket) => {
        return <TicketItem key={ticket.id} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
