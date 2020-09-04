import React, { useContext, useState } from "react";
import "./ticketDashboard.css";
import { Grid, Button} from "semantic-ui-react";
import TicketList from "./TicketList/TicketList";
import { Link } from "react-router-dom";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import SearchBar from "./SearchBar";

const TicketDashboard = () => {
  const store = useContext(Store);
  const { sortedTickets } = store.ticketStore;
  const { resourceLoading } = store.commonStore;
  const { user } = store.userStore;

  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);

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
      <Grid columns={6} id="ticketsHeader">
        <Grid.Column width={2} className="remove-padding table-header">
          Author
        </Grid.Column>
        <Grid.Column width={3} className="remove-padding table-header">
          Status
        </Grid.Column>
        <Grid.Column width={2} className="remove-padding table-header">
          Product
        </Grid.Column>
        <Grid.Column width={4} className="remove-padding table-header">
          Title
        </Grid.Column>
        <Grid.Column width={3} className="remove-padding table-header">
          Date
        </Grid.Column>
        <Grid.Column
          width={2}
          className="remove-padding table-header"
        ></Grid.Column>
      </Grid>
      <hr />
      {resourceLoading && <LoadingComp loadingText="Loading Tickets" />}
      {!resourceLoading && (
        <div>
          <TicketList ticketsArr={sortedTickets} />
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
      )}
    </div>
  );
};

export default observer(TicketDashboard);
