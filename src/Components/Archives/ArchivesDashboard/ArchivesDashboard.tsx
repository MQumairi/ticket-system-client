import React, { useContext } from "react";
import Store from "../../App/Store/rootStore";
import TicketList from "../../Tickets/TicketsDashboard/TicketList/TicketList";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import TicketDashboardTR from "../../Tickets/TicketsDashboard/TicketDashboardTR";
import PageController from "../../Tickets/TicketsDashboard/PageController";
import { Grid } from "semantic-ui-react";
import SearchContainer from "../../Tickets/TicketsDashboard/Search/SearchContainer";

const ArchivesDashboard = () => {
  const store = useContext(Store);
  const {
    sortedArchives,
    isFilteredArchive,
    page_archive,
    totalArchivePages,
    setArchivePage,
    loadArchives,
    loadSearchedArchives,
  } = store.ticketStore;
  const { resourceLoading } = store.commonStore;

  return (
    <div id="TicketDashboard">
      <Grid>
        <Grid.Column width={12}>
          <h2>Archives</h2>
        </Grid.Column>
        <Grid.Column width={4}>
          <SearchContainer
            loadSearchedTickets={loadSearchedArchives}
            loadTickets={loadArchives}
          />
        </Grid.Column>
      </Grid>
      {!resourceLoading && (
        <div>
          <hr />
          <TicketDashboardTR />
          <hr />
          <TicketList ticketsArr={sortedArchives} />{" "}
        </div>
      )}
      {resourceLoading && <LoadingComp loadingText="Loading Archives" />}
      {!isFilteredArchive && (
        <PageController
          page={page_archive}
          totalPages={totalArchivePages}
          setPage={setArchivePage}
          loadTickets={loadArchives}
        />
      )}
    </div>
  );
};

export default observer(ArchivesDashboard);
