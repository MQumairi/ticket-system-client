import React, { useContext } from "react";
import "./filterDashboard.css";
import Status from "./Status/Status";
import Product from "./Product/Product";
import Dates from "./Dates/Dates";
import { Button } from "semantic-ui-react";
import Store from "../../App/Store/rootStore"
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const FilterByDashboard = () => {

  const store = useContext(Store);
  const { setIsFiltered } = store.filterStore;

  
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
      <Button onClick={() => setIsFiltered(true)} className="mainButton">FILTER</Button>
      <Button onClick={() => setIsFiltered(false)} className="mainButton">RESET</Button>
    </div>
  );
};

export default observer(FilterByDashboard);
