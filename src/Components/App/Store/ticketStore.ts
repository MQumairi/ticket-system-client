import { observable, action, runInAction, computed } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";
import { Tickets, Developers } from "../../../API/agent";
import { Archives } from "../../../API/agent";
import { format } from "date-fns";
import { IComment } from "../../../Models/comment";
import { ITicketForm } from "../../../Models/ticketForm";
import { IFilters } from "../../../Models/filters";

const LIMIT = 5;

export default class TicketStore {
  constructor(public rootStore: Store) {}

  //Pagination
  @observable isFiltered = false;
  @observable ticketCount: number = 0;
  @observable page: number = 0;

  @computed get totalPages() {
    return Math.ceil(this.ticketCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action setIsFiltered = (isFiltered : boolean) => {
    this.isFiltered = isFiltered;
  }

  //Initialize the Ticket Registry
  @observable ticketsRegistry = observable.map(new Map<number, ITicket>());

  //Load tickets from API to Registry
  @action loadTickets = async () => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.setIsFiltered(false);
      const loadedTicketsEnvelop = await Tickets.list(LIMIT, this.page);
      runInAction(() => {
        const loadedTickets = loadedTicketsEnvelop.tickets;
        this.ticketsRegistry.clear();
        loadedTickets.forEach((ticket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.ticketsRegistry.set(ticket.post_id!, ticket);
        });

        this.ticketCount = loadedTicketsEnvelop.ticketCount;
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  @computed get sortedTickets(): ITicket[] {
    const tickets = Array.from(this.ticketsRegistry.values())
      .slice()
      .sort((t1, t2) => {
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
      });
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

  //Archive pagination
  @observable isFilteredArchive = false;
  @observable archiveCount: number = 0;
  @observable page_archive: number = 0;

  @computed get totalArchivePages() {
    return Math.ceil(this.archiveCount / LIMIT);
  }

  @action setArchivePage = (page_archive: number) => {
    this.page_archive = page_archive;
  };

  @action setIsFilteredArchive = (isFilteredArchive : boolean) => {
    this.isFilteredArchive = isFilteredArchive;
  }

  //Archives
  @observable archivesRegistry = observable.map(new Map<number, ITicket>());

  @action loadArchives = async () => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.setIsFilteredArchive(false);
      const loadedArchivesEnvelop = await Archives.list(LIMIT, this.page_archive);
      runInAction(() => {
        const loadedArchives = loadedArchivesEnvelop.archive;
        this.archivesRegistry.clear();
        loadedArchives.forEach((ticket: ITicket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.archivesRegistry.set(ticket.post_id!, ticket);
        });
        this.archiveCount = loadedArchivesEnvelop.archiveCount;
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  @computed get sortedArchives(): ITicket[] {
    let archives = Array.from(this.archivesRegistry.values())
      .slice()
      .sort((a1, a2) => {
        return Date.parse(a1.date_time) - Date.parse(a2.date_time);
      });

    return archives;
  }

  //Manage tickets
  @action manageTicket = async (ticketId: number, ticket: ITicketForm) => {
    try {
      await Developers.manage(ticketId.toString(), ticket);
      runInAction(() => {
        //If the ticket is being set to archived, remove it from ticket registry
        if (!ticket.is_archived) {
          this.archivesRegistry.delete(ticketId);
        }

        //If the ticket is being set to current, remove it from archives registry
        if (ticket.is_archived) {
          this.ticketsRegistry.delete(ticketId);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Filter Tickets
  @action loadFilteredTickets = async (filters: IFilters) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.setIsFiltered(true);
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
  };

  //Search Tickets
  @action loadSearchedTickets = async (search_query: string) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.setIsFiltered(true);
      const loadedSearchedTickets = await Tickets.search(search_query);
      runInAction(() => {
        this.ticketsRegistry.clear();
        loadedSearchedTickets.forEach((ticket) => {
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

  //Search arhives
  @action loadSearchedArchives = async (search_query: string) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.setIsFilteredArchive(true);
      const loadedSearchArchives = await Archives.search(search_query);
      runInAction(() => {
        this.archivesRegistry.clear();
        loadedSearchArchives.forEach((ticket) => {
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
}
