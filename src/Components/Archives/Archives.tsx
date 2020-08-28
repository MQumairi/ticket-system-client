import React, { useContext, useEffect } from "react";
import "./archives.css";
import ArchivesDashboard from "./ArchivesDashboard/ArchivesDashboard";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";

const Archives = () => {
  const store = useContext(Store);
  const { loadArchives } = store.ticketStore;

  useEffect(() => {
    loadArchives();
  }, [loadArchives]);

  return (
    <div id="archiveBox">
      <ArchivesDashboard />
    </div>
  );
};

export default observer(Archives);
