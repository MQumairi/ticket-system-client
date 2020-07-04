import React, { useContext } from "react";
import "./filterDashboard.css";
import Status from "./Status/Status";
import Product from "./Product/Product";
import Dates from "./Dates/Dates";
import { Button } from "semantic-ui-react";
import Store from "../../App/Store/rootStore"

const FilterByDashboard = () => {

  const store = useContext(Store);
  const { selectAll } = store.filterStore;
  
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
      <Button onClick={() => selectAll()} className="mainButton fullWidth">SELECT ALL</Button>
    </div>
  );
};

export default FilterByDashboard;
