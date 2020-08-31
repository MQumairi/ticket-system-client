import React from "react";
import TicketItem from "./TicketItem/TicketItem";
import { observer } from "mobx-react-lite";
import "./ticketList.css";
import { ITicket } from "../../../../Models/ticket";
import ErrorNotice from "../../../Utility/Error Notice/ErrorNotice";

interface IProps {
  ticketsArr : ITicket[];
}

const TicketList:React.FC<IProps> = ({ticketsArr}) => {

  return (
    <div id="ticketList">
      {ticketsArr.length === 0 && <ErrorNotice message="No tickets right now" />}
      {ticketsArr.length > 0 && ticketsArr.map((ticket) => {
        return <TicketItem key={ticket.post_id!} ticket={ticket} />;
      })}
    </div>
  );
};

export default observer(TicketList);
