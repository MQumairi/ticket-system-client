import React, { useContext, useEffect } from "react";
import TicketsForm from "../Utility/TicketsForm/TicketsForm";
import Store from "../App/Store/rootStore";
import { RouteComponentProps } from "react-router-dom";

interface params {
  id: string;
}

const TicketsEdit: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { getTicket, currentTicket } = store.ticketStore;

  useEffect(() => {
    getTicket(match.params.id);
  }, [getTicket, match.params.id]);

  return (
    <div>
        {console.log("Param id = " + match.params.id)}
        {console.log("Current ticket " + currentTicket?.title)}
      <TicketsForm ticket={currentTicket!} />
    </div>
  );
};

export default TicketsEdit;
