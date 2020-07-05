import React, { useContext, useState, useEffect } from "react";
import Store from "../App/Store/rootStore";
import { ITicket } from "../../Models/ticket";
import { RouteComponentProps } from "react-router-dom";

interface params {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { getTicket } = store.ticketStore;

  const [currentTicket, setCurrentTicket] = useState<ITicket | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentTicket(getTicket(match.params.id));
  }, [getTicket, match.params.id]);

  return (
    <div>
      <h1>Hello from Ticket details</h1>
      <p>{currentTicket?.id}</p>
      <p>{currentTicket?.author}</p>
      <p>{currentTicket?.title}</p>
      <p>{currentTicket?.description}</p>
    </div>
  );
};

export default TicketDetails;
