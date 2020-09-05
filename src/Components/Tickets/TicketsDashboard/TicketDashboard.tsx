import React, { useContext } from "react";
import "./ticketDashboard.css";
import { Grid, Button } from "semantic-ui-react";
import TicketList from "./TicketList/TicketList";
import { Link } from "react-router-dom";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import TicketDashboardTR from "./TicketDashboardTR";
import PageController from "./PageController";
import SearchContainer from "./Search/SearchContainer";

const TicketDashboard = () => {
  const store = useContext(Store);
  const {
    sortedTickets,
    page,
    totalPages,
    setPage,
    loadTickets,
    isFiltered,
    loadSearchedTickets
  } = store.ticketStore;
  const { resourceLoading } = store.commonStore;
  const { user } = store.userStore;

  return (
    <div id="TicketDashboard">
      <Grid>
        <Grid.Column width={12}>
          <h2>Tickets</h2>
        </Grid.Column>
        <Grid.Column width={4}>
          <SearchContainer loadSearchedTickets={loadSearchedTickets} loadTickets={loadTickets}/>
        </Grid.Column>
      </Grid>

      <hr />
      <TicketDashboardTR />
      <hr />
      {resourceLoading && <div className="ticketsCompContainer"><LoadingComp loadingText="Loading Tickets" /></div>}
      {!resourceLoading && (
        <div className="ticketsCompContainer">
          <TicketList ticketsArr={sortedTickets} />
        </div>
      )}

      <div className="ticketDashboardFoot">
        {!isFiltered && (
          <PageController page={page} totalPages={totalPages} setPage={setPage} loadTickets={loadTickets}/>
        )}

        {user && (
          <Button
            as={Link}
            to="/tickets/new"
            className="mainButton postTicketButton"
          >
            POST TICKET
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(TicketDashboard);
