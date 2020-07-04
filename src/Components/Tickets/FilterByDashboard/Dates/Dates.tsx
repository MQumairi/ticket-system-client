import React, { useContext } from "react";
import { Input } from "semantic-ui-react";
import Store from "../../../App/Store/rootStore";
import "./dates.css";

const Dates = () => {
  const store = useContext(Store);
  const {changeFromDate, changeToDate, filterTickets} = store.filterStore;

  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeFromDate(e.target.value);
    filterTickets();
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeToDate(e.target.value);
    filterTickets();
  };

  return (
    <div className="filterDates">
      <h4 className="filterTitle">Dates</h4>
      <div className="dateSubheading">From</div>
      <Input
        onChange={(e) => {
          handleChangeFrom(e);
        }}
        type="date"
        placeholder="Search users..."
      />
      <div className="dateSubheading">To</div>
      <Input
        onChange={(e) => {
          handleChangeTo(e);
        }}
        type="date"
        placeholder="Search users..."
      />
    </div>
  );
};

export default Dates;
