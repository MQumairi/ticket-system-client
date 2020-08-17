import React, { useContext } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import Store from "../../../App/Store/rootStore";

const TicketList = () => {
  const store = useContext(Store);
  const {
    ticketsRegistry,
  } = store.ticketStore;

  return (
    <div id="ticketList">
      {Array.from(ticketsRegistry).map(([number, ticket]) => {
        return <TicketItem key={number} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
