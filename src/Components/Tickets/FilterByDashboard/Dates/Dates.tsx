import React, { useContext, useEffect, useState } from "react";
import Store from "../../../App/Store/rootStore";
import "./dates.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

const minDate = Date.parse("0001-01-01");
const maxDate = Date.parse("9999-12-30");

const Dates = () => {
  const store = useContext(Store);
  const { filters, setDateFrom, setDateTo } = store.filterStore;

  const [localDateFrom, setLocalDateFrom] = useState<string | undefined>(
    undefined
  );
  const [localDateTo, setLocalDateTo] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (filters.date_from === format(minDate, "MM/dd/yyyy")) {
      setLocalDateFrom(undefined);
    } else {
      setLocalDateFrom(filters.date_from);
    }

    if (filters.date_to === format(maxDate, "MM/dd/yyyy")) {
      setLocalDateTo(undefined);
    } else {
      setLocalDateTo(filters.date_to);
    }

  }, [filters.date_from, setLocalDateFrom, filters.date_to]);

  const handleChangeFrom = (day: any) => {
    setDateFrom(day);
  };

  const handleChangeTo = (day: any) => {
    setDateTo(day);
  };

  return (
    <div className="filterDates">
      <h4 className="filterTitle">Dates</h4>
      <div className="dateSubheading">From</div>
      <DayPickerInput inputProps={{readOnly: 'readOnly', placeholder: "Date From"}} onDayChange={handleChangeFrom} value={localDateFrom} />
      <div className="dateSubheading">To</div>
      <DayPickerInput inputProps={{readOnly: 'readOnly', placeholder: "Date To"}} onDayChange={handleChangeTo} value={localDateTo} />
    </div>
  );
};

export default observer(Dates);
