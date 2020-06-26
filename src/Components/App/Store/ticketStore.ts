import { observable, action } from "mobx";
import { createContext } from "react";
import { ITicket } from "../../../Models/ticket";

class TicketStore {
  @observable tickets: ITicket[] = [
    {
      author: "Pablo",
      id: 265,
      status: "Pending",
      product: "Product 1",
      title: "Document does not save",
      date: "22/02/2020",
    },
    {
      author: "Bujigen",
      id: 303,
      status: "Urgent",
      product: "Product 3",
      title: "Crash on startup at Night",
      date: "22/02/2020",
    },
    {
      author: "Sam",
      id: 621,
      status: "Done",
      product: "Product 1",
      title: "Require Refund",
      date: "22/02/2020",
    },
    {
      author: "Pablo",
      id: 905,
      status: "Pending",
      product: "Product 2",
      title: "Update not instaling",
      date: "22/02/2020",
    },
  ];

  @observable filteredTickets: ITicket[] = [...this.tickets];

  //ACTIONS

  @action filterTicketsByStatus = (status: string) => {
    this.filteredTickets = this.filterStatus(status, this.filteredTickets);
  };

  @action filterTicketsByProduct = (product: string) => {
      this.filteredTickets = this.filterProduct(product, this.filteredTickets);
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
}

export default createContext(new TicketStore());
