import React, { useContext } from "react";
import "./filterDashboard.css";
import Status from "./Status/Status";
import Product from "./Product/Product";
import Dates from "./Dates/Dates";
import { Button } from "semantic-ui-react";
import TicketStore from "../../App/Store/ticketStore"

const FilterByDashboard = () => {

  const store = useContext(TicketStore);
  const { selectAll } = store;
  
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
