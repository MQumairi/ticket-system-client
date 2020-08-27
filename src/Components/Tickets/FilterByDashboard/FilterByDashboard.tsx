import React, { useContext } from "react";
import "./filterDashboard.css";
import Status from "./Status/Status";
import Product from "./Product/Product";
import Dates from "./Dates/Dates";
import { Button } from "semantic-ui-react";
import Store from "../../App/Store/rootStore"
import { observer } from "mobx-react-lite";

const FilterByDashboard = () => {

  const store = useContext(Store);
  const { setIsFiltered, filters, defaultStatuses, defaultProducts, resetFilters} = store.filterStore;
  const {loadFilteredTickets} = store.ticketStore;


  const handleFilter = () => {
    setIsFiltered(true);
    if(filters.status_ids.length === 0) defaultStatuses();
    if(filters.product_ids.length === 0) defaultProducts();
    loadFilteredTickets(filters);
  }

  const handleReset = () => {
    setIsFiltered(false)
    resetFilters();
  }
  
  return (
    <div id="FilterDashboard">
      <h3>Filter By</h3>
      <hr />
      <Status />
      <hr />
      <Product />
      <hr />
      <Dates />
      <hr />
      <Button onClick={() => handleFilter()} className="mainButton" name="filterButton">FILTER</Button>
      <Button onClick={() => handleReset()} className="mainButton" name="resetButton">RESET</Button>
    </div>
  );
};

export default observer(FilterByDashboard);
