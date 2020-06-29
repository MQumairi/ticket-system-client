import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { ITicket } from "../../../Models/ticket";

class FilterStore {
  @observable tickets: ITicket[] = [
    {
      author: "Pablo",
      id: 265,
      status: "Pending",
      product: "Product 1",
      title: "Document does not save",
      date: "2020-01-01",
    },
    {
      author: "Bujigen",
      id: 303,
      status: "Done",
      product: "Product 2",
      title: "Crash on startup at Night",
      date: "2020-02-01",
    },
    {
      author: "Sam",
      id: 621,
      status: "Done",
      product: "Product 1",
      title: "Require Refund",
      date: "2020-02-01",
    },
    {
      author: "Pablo",
      id: 905,
      status: "Pending",
      product: "Product 2",
      title: "Update not instaling",
      date: "2020-12-01",
    },
    {
      author: "Moj",
      id: 1005,
      status: "Low",
      product: "Product 1",
      title: "Activiation Key missing",
      date: "2020-06-01",
    },
    {
      author: "Bujigen",
      id: 892,
      status: "Urgent",
      product: "Product 3",
      title: "Crash on startup at Night",
      date: "2020-02-01",
    },
    {
      author: "Sam",
      id: 222,
      status: "Done",
      product: "Product 1",
      title: "Require Refund",
      date: "2020-02-01",
    },
    {
      author: "Pablo",
      id: 10,
      status: "Pending",
      product: "Product 2",
      title: "Update not instaling",
      date: "2020-12-01",
    },
    {
      author: "Moj",
      id: 45,
      status: "Low",
      product: "Product 1",
      title: "Activiation Key missing",
      date: "2020-06-01",
    },
  ];

  @observable filteredTickets: ITicket[] = [...this.tickets];

  @observable fromDateFilter = "0001-01-01";
  @observable toDateFilter = "9999-12-30";

  @observable statusFilterPicked = "";
  @observable productFilterPicked = "";

  @computed get defaultFilters() {
    if (
      this.statusFilterPicked === "" &&
      this.productFilterPicked === "" &&
      this.fromDateFilter === "0001-01-01" &&
      this.toDateFilter === "9999-12-30"
    ) {
      console.log("It's true!");
      return true;
    }
    console.log("false");
    return false;
  }

  //ACTIONS

  @action filterTicketsByStatus = (status: string) => {
    if (this.defaultFilters) this.selectAll();
    if (this.statusFilterPicked === status)
      this.filteredTickets = this.filterStatus(status, this.filteredTickets);
  };

  @action setStatusFilterPicked = (status: string) => {
    this.statusFilterPicked = status;
  };

  @action filterTicketsByProduct = (product: string) => {
    if (this.defaultFilters)
      this.selectAll();
    if (this.productFilterPicked === product)
      this.filteredTickets = this.filterProduct(product, this.filteredTickets);
  };

  @action setProductFilterPicked = (product: string) => {
    this.productFilterPicked = product;
  };

  @action changeFromDate = (date: string) => {
    if (date === "") {
      this.fromDateFilter = "9999-12-30";
    } else {
      this.fromDateFilter = date;
    }
    if (this.defaultFilters) this.selectAll();
    this.filteredTickets = this.filterDate(
      this.fromDateFilter,
      this.toDateFilter,
      this.filteredTickets
    );
  };

  @action changeToDate = (date: string) => {
    if (date === "") {
      this.toDateFilter = "9999-12-30";
    } else {
      this.toDateFilter = date;
    }
    if (this.defaultFilters) this.selectAll();
    this.filteredTickets = this.filterDate(
      this.fromDateFilter,
      this.toDateFilter,
      this.filteredTickets
    );
  };

  @action selectAll = () => {
    this.filteredTickets = this.tickets;
  };

  //HELPER FUNCTIONS

  //Takes a filter criterion, and filters "tickets"
  filterStatus = (status: string, arr: ITicket[]): ITicket[] => {
    return arr.filter((ticket) => {
      return ticket.status === status;
    });
  };

  filterProduct = (product: string, arr: ITicket[]): ITicket[] => {
    return arr.filter((ticket) => {
      return ticket.product === product;
    });
  };

  filterDate = (
    fromDate: string,
    toDate: string,
    arr: ITicket[]
  ): ITicket[] => {
    return arr.filter((ticket) => {
      return ticket.date >= fromDate && ticket.date <= toDate;
    });
  };
}

export default createContext(new FilterStore());
