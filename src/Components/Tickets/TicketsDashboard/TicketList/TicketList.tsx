import React, { useContext } from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import { ITicket } from "../../../../Models/ticket";
import Store from "../../../App/Store/rootStore";

interface IProps {
  ticketsArr : ITicket[];
}

const TicketList:React.FC<IProps> = ({ticketsArr}) => {

  return (
    <div id="ticketList">
      {ticketsArr.map((ticket) => {
        return <TicketItem key={ticket.post_id!} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
