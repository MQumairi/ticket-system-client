import React, { useContext } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import { ITicket } from "../../../../Models/ticket";
import Store from "../../../App/Store/rootStore";



const TicketList = ({}) => {
  
  const store = useContext(Store);
  const {sortedTickets} = store.ticketStore;

  return (
    <div id="ticketList">
      {sortedTickets.map((ticket) => {
        return <TicketItem key={ticket.post_id!} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
