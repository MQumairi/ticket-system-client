import React, { useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";


interface params {
  id: string;
}

const DevConsole: React.FC<RouteComponentProps<params>> = ({ match }) => {
    
  const store = useContext(Store);
  const { currentTicket, getTicket } = store.ticketStore;

  useEffect(() => {
    getTicket(match.params.id);
  }, [getTicket, match.params.id]);

  if (currentTicket === null) return <div>Error 404</div>;

  return (
    <div>
      <h1>Here's your console</h1>
      {currentTicket.title}
    </div>
  );
};

export default observer(DevConsole);
