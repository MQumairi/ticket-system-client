import { observable, action, toJS } from "mobx";
import { Store } from "./rootStore";
import { IFilters } from "../../../Models/filters";
import { format } from "date-fns";

const minDate = Date.parse("0001-01-01");
const maxDate = Date.parse("9999-12-30");

export default class FilterStore {
  constructor(public rootStore: Store) {}

  defaultFilters: IFilters = {
    product_ids: [],
    status_ids: [],
    date_from: format(minDate, "MM/dd/yyyy h:m:s a"),
    date_to: format(maxDate, "MM/dd/yyyy h:m:s a"),
  };

  @observable isFiltered = false;

  @action setIsFiltered = (isFiltered: boolean) => {
    this.isFiltered = isFiltered;
    console.log(toJS(this.isFiltered));
  }

  @observable filters: IFilters = { ...this.defaultFilters };

  @action filterProducts = (product_id: number) => {

    if(!this.filters.product_ids.includes(product_id)) {
      this.filters.product_ids.push(product_id);
    } else {
      this.filters.product_ids = this.filters.product_ids.filter((product_id_to_remove) => {
        return product_id_to_remove !== product_id;
      });
    }

    console.log(toJS(this.filters));
  };

  @action filterStatuses = (status_id: number) => {

    if(!this.filters.status_ids.includes(status_id)) {
      this.filters.status_ids.push(status_id);
    } else {
      this.filters.status_ids = this.filters.status_ids.filter((status_id_to_remove) => {
        return status_id_to_remove !== status_id;
      });
    }

    console.log(toJS(this.filters));
  };

  @action setDateFrom = (date_from: number) => {
    this.filters.date_from = format(date_from, "MM/dd/yyyy h:m:s a");
    console.log(toJS(this.filters));
  };

  @action setDateTo = (date_to: number) => {
    this.filters.date_to = format(date_to, "MM/dd/yyyy h:m:s a");
    console.log(toJS(this.filters));
  };

  @action resetFilters = () => {
    this.filters = { ...this.defaultFilters };
  };

}
