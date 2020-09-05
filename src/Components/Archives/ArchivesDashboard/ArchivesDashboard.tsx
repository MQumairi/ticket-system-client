import React, { useContext } from "react";
import Store from "../../App/Store/rootStore";
import TicketList from "../../Tickets/TicketsDashboard/TicketList/TicketList";
import { observer } from "mobx-react-lite";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import TicketDashboardTR from "../../Tickets/TicketsDashboard/TicketDashboardTR";
import PageController from "../../Tickets/TicketsDashboard/PageController";

const ArchivesDashboard = () => {
  const store = useContext(Store);
  const { sortedArchives, isFilteredArchive, page_archive, totalArchivePages, setArchivePage, loadArchives } = store.ticketStore;
  const { resourceLoading } = store.commonStore;

  return (
    <div id="TicketDashboard">
      <h2>Archives</h2>
      {!resourceLoading && (
        <div>
          <hr />
          <TicketDashboardTR />
          <hr />
          <TicketList ticketsArr={sortedArchives} />{" "}
        </div>
      )}
      {!isFilteredArchive && <PageController page={page_archive} totalPages={totalArchivePages} setPage={setArchivePage} loadTickets={loadArchives} />}
      {resourceLoading && <LoadingComp loadingText="Loading Archives" />}
    </div>
  );
};

export default observer(ArchivesDashboard);
