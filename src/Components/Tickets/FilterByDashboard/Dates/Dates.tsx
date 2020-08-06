import React, { useContext } from "react";
import Store from "../../../App/Store/rootStore";
import "./dates.css";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const Dates = () => {
  const store = useContext(Store);
  const {changeFromDate, changeToDate, filterTickets} = store.filterStore;

  const handleChangeFrom = (day: any) => {
    let fromDate = Date.parse(day);
    changeFromDate(fromDate);
    filterTickets();
  };

  const handleChangeTo = (day: any) => {
    let toDate = Date.parse(day);
    changeToDate(toDate);
    filterTickets();
  };

  return (
    <div className="filterDates">
      <h4 className="filterTitle">Dates</h4>
      <div className="dateSubheading">From</div>
      <DayPickerInput
      onDayChange={handleChangeFrom}
      />
      <div className="dateSubheading">To</div>
      <DayPickerInput
      onDayChange={handleChangeTo}
      />
    </div>
  );
};

export default Dates;
