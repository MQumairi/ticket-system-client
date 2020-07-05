import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";

export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Observables
  @observable tickets: ITicket[] = [
    {
      author: "Pablo",
      id: 265,
      status: "Pending",
      product: "Product 3",
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

  //Actions
  @action addTicket = (ticket: ITicket) => {
    this.tickets.push(ticket);
  };

  @action getTicket = (id: string) => {
    let query = Number(id);
    return this.tickets.find((ticket) => {
      return ticket.id === query;
    });
  };
}
