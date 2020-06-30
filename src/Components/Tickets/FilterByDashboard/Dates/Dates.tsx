import React, { useContext } from "react";
import { Input } from "semantic-ui-react";
import FilterStore from "../../../App/Store/filterStore";
import "./dates.css";

const Dates = () => {
  const ticketStore = useContext(FilterStore);
  const { changeFromDate, changeToDate, filterTickets } = ticketStore;

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
