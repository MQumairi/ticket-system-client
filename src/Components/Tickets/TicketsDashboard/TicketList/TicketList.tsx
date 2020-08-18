import React from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import { ITicket } from "../../../../Models/ticket";

interface IProps {
  ticketsMap : Map<number, ITicket>;
}

const TicketList:React.FC<IProps> = ({ticketsMap}) => {

  return (
    <div id="ticketList">
      {Array.from(ticketsMap).map(([number, ticket]) => {
        return <TicketItem key={number} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
