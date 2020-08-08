import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";
import { Tickets } from "../../../API/agent";
import { format } from "date-fns";
import { IComment } from "../../../Models/comment";
import { ITicketForm } from "../../../Models/ticketForm";

export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Initialize the Ticket Registry
  @observable ticketsRegistry = new Map<number, ITicket>();

  //Load tickets from API to Registry
  @action loadTickets = async () => {
    try {
      const loadedTickets = await Tickets.list();
      loadedTickets.forEach((ticket) => {
        let ticketDate = Date.parse(ticket.date_time);
        ticket.display_date = format(ticketDate, "dd/MM/yyyy");
        this.ticketsRegistry.set(ticket.post_id!, ticket);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Initialize the current ticket
  @observable currentTicket: ITicket | null = null;

  //Load a ticket by ID from the API, and set it to currentTicket
  @action getTicket = async (id: string) => {
    try {
      let loadedTicket = await Tickets.details(id);
      let ticketDate = Date.parse(loadedTicket.date_time);
      loadedTicket.display_date = format(ticketDate, "dd/MM/yyyy");

      loadedTicket.comments.forEach((comment: IComment) => {
        let commentDate = Date.parse(comment.date_time);
        comment.display_date = format(commentDate, "dd/MM/yyyy");
      });

      this.currentTicket = loadedTicket;
    } catch (e) {
      console.log(e);
    }
  };

  //Rest
  @action addTicket = async (ticket: ITicketForm) => {
    try {
      await Tickets.create(ticket);
    } catch (e) {
      console.log(e);
    }
  };

  @action deleteTicket = async (id: string) => {
    try {
      await Tickets.delete(id);
    } catch (e) {
      console.log(e);
    }
  };

  @action editTicket = async (ticket: ITicketForm) => {
    try {
      await Tickets.edit(ticket);
    } catch (e) {
      console.log(e);
    }
  }
}
