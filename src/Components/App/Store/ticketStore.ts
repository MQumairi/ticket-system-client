import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";

export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Observables
  @observable tickets: ITicket[] = [
    {
      authorId: 1,
      id: 265,
      status: "Pending",
      product: "Product 3",
      title: "Document does not save",
      date: "2020-01-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [],
    },
    {
      authorId: 2,
      id: 303,
      status: "Done",
      product: "Product 2",
      title: "Crash on startup at Night",
      date: "2020-02-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [],
    },
    {
      authorId: 2,
      id: 621,
      status: "Done",
      product: "Product 1",
      title: "Require Refund",
      date: "2020-02-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [],
    },
    {
      authorId: 1,
      id: 905,
      status: "Pending",
      product: "Product 2",
      title: "Update not instaling",
      date: "2020-12-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [],
    },
    {
      authorId: 1,
      id: 1005,
      status: "Low",
      product: "Product 1",
      title: "Activiation Key missing",
      date: "2020-06-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [],
    },
    {
      authorId: 1,
      id: 45,
      status: "Low",
      product: "Product 1",
      title: "Not connecting to database",
      date: "2020-06-01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt magnam expedita. Libero voluptas, fugit possimus voluptatum porro neque molestiae aliquam. Voluptate aliquam culpa rerum necessitatibus vero expedita porro! Quam?",
      commentIds: [1, 2],
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
