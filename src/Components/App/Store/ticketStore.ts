import { observable, action } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";
import { Tickets } from "../../../API/agent";
import { format } from 'date-fns'



export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Observables
  @observable ticketsRegistry = new Map<number, ITicket>();

  //Actions
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

  @action addTicket = async (ticket: ITicket) => {
    try {
      await Tickets.create(ticket);
      this.ticketsRegistry.set(ticket.post_id!, ticket);
    } catch (e) {
      console.log(e);
    }
  };

  @action getTicket = (id: string) => {
    let query = Number(id);
    return this.ticketsRegistry.get(query);
  };

  @action deleteTicket = (id: number) => {
    this.ticketsRegistry.delete(id);

    //Printing
    console.log("----------------");
    console.log("From Ticket Store's deleteTicket");
    console.log(this.ticketsRegistry.size);
  };
}
