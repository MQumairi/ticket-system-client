import { observable, action, runInAction, toJS, computed } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";
import { Tickets, Developers } from "../../../API/agent";
import { Archives } from "../../../API/agent";
import { format } from "date-fns";
import { IComment } from "../../../Models/comment";
import { ITicketForm } from "../../../Models/ticketForm";
import { IFilters } from "../../../Models/filters";

export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Initialize the Ticket Registry
  @observable ticketsRegistry = observable.map(new Map<number, ITicket>());

  //Load tickets from API to Registry
  @action loadTickets = async () => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      const loadedTickets = await Tickets.list();
      runInAction(() => {
        loadedTickets.forEach((ticket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.ticketsRegistry.set(ticket.post_id!, ticket);
        });

        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  @computed get sortedTickets(): ITicket[]{

    const tickets = Array.from(this.ticketsRegistry.values()).sort((t1, t2) => {
      return Date.parse(t1.date_time) - Date.parse(t2.date_time);
    });
    
    return tickets;
  }

  //Initialize the current ticket
  @observable currentTicket: ITicket | null = null;

  //Load a ticket by ID from the API, and set it to currentTicket
  @action getTicket = async (id: string) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      let loadedTicket = await Tickets.details(id);

      runInAction(() => {
      let ticketDate = Date.parse(loadedTicket.date_time);
      loadedTicket.display_date = format(ticketDate, "dd/MM/yyyy");

      loadedTicket.comments.forEach((comment: IComment) => {
        let commentDate = Date.parse(comment.date_time);
        comment.display_date = format(commentDate, "dd/MM/yyyy");
      });

      this.currentTicket = loadedTicket;
      this.rootStore.commonStore.setResourceLoading(false);
      })
      
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  //Rest
  @action addTicket = async (formData: FormData) => {
    try {
      await Tickets.create(formData);
    } catch (e) {
      console.log(e);
    }
  };

  @action deleteTicket = async (id: string) => {
    try {
      await Tickets.delete(id).then(() => {
        runInAction(() => {
          this.ticketsRegistry.delete(+id);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action editTicket = async (ticketId: number, ticket: FormData) => {
    try {
      await Tickets.edit(ticketId.toString(), ticket);
    } catch (e) {
      console.log(e);
    }
  };

  //Archives
  @observable archivesRegistry = observable.map(new Map<number, ITicket>());

  @action loadArchives = async () => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      const loadedArchives = await Archives.list();
      runInAction(() => {
        loadedArchives.forEach((ticket : ITicket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.archivesRegistry.set(ticket.post_id!, ticket);
        });
      this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  @computed get sortedArchives () : ITicket[] {
    let archives = Array.from(this.archivesRegistry.values()).sort((a1, a2) => {
      return Date.parse(a1.date_time) - Date.parse(a2.date_time); 
    })

    return archives;
  }

  //Manage tickets
  @action manageTicket = async (ticketId: number, ticket: ITicketForm) => {
    try {
      await Developers.manage(ticketId.toString(), ticket);
    } catch(e) {
       console.log(e);
    }
  }

  //Filter Tickets
  @action loadFilteredTickets = async (filters: IFilters) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      const loadedFilteredTickets = await Tickets.filter(filters);
      runInAction(() => {
        this.ticketsRegistry.clear();
        loadedFilteredTickets.forEach((ticket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.ticketsRegistry.set(ticket.post_id!, ticket);
        });
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  }
}
