import React, { useContext, useState } from "react";
import "./ticketDashboard.css";
import { Grid, Button, Icon } from "semantic-ui-react";
import TicketList from "./TicketList/TicketList";
import { Link } from "react-router-dom";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import SearchBar from "./SearchBar";
import TicketDashboardTR from "./TicketDashboardTR";

const TicketDashboard = () => {
  const store = useContext(Store);
  const {
    sortedTickets,
    page,
    totalPages,
    setPage,
    loadTickets,
    isFiltered,
  } = store.ticketStore;
  const { resourceLoading } = store.commonStore;
  const { user } = store.userStore;

  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);

  const onMinPage = !(page > 0);
  const onMaxPage = !(page + 1 < totalPages);

  const handlePageDown = () => {
    console.log("clciked down");

    if (!onMinPage) {
      setPage(page - 1);
      loadTickets();
    }
  };

  const handlePageUp = () => {
    console.log("clciked up");

    if (!onMaxPage) {
      setPage(page + 1);
      loadTickets();
    }
  };

  return (
    <div id="TicketDashboard">
      <Grid>
        <Grid.Column width={12}>
          <h2>Tickets</h2>
        </Grid.Column>
        <Grid.Column width={4}>
          <div className="searchContainer">
            {searchBarOpen && <SearchBar />}
            <Button
              className="searchButton"
              circular
              icon="search"
              onClick={() => setSearchBarOpen(!searchBarOpen)}
            />
          </div>
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
          <div className="pageNumbers">
            <Icon
              name="arrow alternate circle left"
              size="big"
              link
              disabled={onMinPage}
              onClick={() => handlePageDown()}
            />
            <div className="currentPage">{page + 1}</div>
            <Icon
              name="arrow alternate circle right"
              size="big"
              link
              disabled={onMaxPage}
              onClick={() => handlePageUp()}
            />
          </div>
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
