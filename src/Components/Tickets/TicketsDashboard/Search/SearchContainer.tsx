import React, { useState } from "react";
import "../ticketDashboard.css";
import { Button } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import { observer } from "mobx-react-lite";

interface IProps {
  loadSearchedTickets: (search_query: string) => Promise<void>;
  loadTickets: () => Promise<void>;
}

const SearchContainer: React.FC<IProps> = ({
  loadSearchedTickets,
  loadTickets,
}) => {
  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);

  return (
    <div className="searchContainer">
      {searchBarOpen && (
        <SearchBar
          loadSearchedTickets={loadSearchedTickets}
          loadTickets={loadTickets}
          setSearchBarOpen={setSearchBarOpen}
        />
      )}
      <Button
        className="searchButton"
        circular
        icon="search"
        onClick={() => setSearchBarOpen(!searchBarOpen)}
      />
    </div>
  );
};

export default observer(SearchContainer);
