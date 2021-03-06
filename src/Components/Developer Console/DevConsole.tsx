import React, { useEffect, useContext } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import "./devConsole.css";
import { Button } from "semantic-ui-react";
import DevTicketForm from "./Developer Ticket Form/DevTicketForm";
import LoadingComp from "../Utility/Loader/LoadingComp";

interface params {
  id: string;
}

const DevConsole: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { currentTicket, getTicket } = store.ticketStore;
  const { loadDevelopers } = store.userStore;
  const { resourceLoading } = store.commonStore;

  useEffect(() => {
    getTicket(match.params.id);
    loadDevelopers();
  }, [getTicket, match.params.id, loadDevelopers]);

  if (resourceLoading || currentTicket === null)
    return (
      <div id="devConsoleBody">
        <LoadingComp loadingText="Loading Developer Console"></LoadingComp>
      </div>
    );

  // if (!user?.role || user.role.can_manage) return <div>No permission</div>;

  return (
    <div id="devConsoleBody">
      {/* Header */}

      <div className="devConsoleHeader">
        <h1>Manage</h1>
        <div className="devConsoleBackButton"><Button
            className="mainButton"
            as={Link}
            to={"/tickets/" + match.params.id}
            content="Back"
          /></div> 
      </div>

      <hr />
      {/* Ticket Info */}
      <div className="ticketInformation">
        <h2> {currentTicket.title}</h2>
        <p>{currentTicket.description}</p>
        {currentTicket.attachment && (
          <img
            alt={currentTicket.attachment.id}
            src={currentTicket.attachment.url}
          />
        )}
      </div>
      <hr />
      <div className="ticketInformation">
        <DevTicketForm currentTicket={currentTicket} />
      </div>
      {/* Management tools */}
      {/* Save */}
    </div>
  );
};

export default observer(DevConsole);
