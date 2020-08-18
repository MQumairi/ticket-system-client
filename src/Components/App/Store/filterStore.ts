import { observable, action, computed } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";

interface IfilterObject {
  status: string[];
  products: string[];
  dates: {
    From: number;
    To: number;
  };
}

const minDate = Date.parse("0001-01-01");
const maxDate = Date.parse("9999-12-30");

export default class FilterStore {
  constructor(public rootStore: Store) {}

  //Getting the statuses from the statusStore
  @observable statuses = this.rootStore.statusStore.statuses;

  //LOGIC

  //Initialize a filterobject. This will store active filters.
  @observable filters: IfilterObject = {
    status: [],
    products: [],
    dates: {
      From: minDate,
      To: maxDate,
    },
  };

  @computed get ticketsRegistry() {
    return observable.map(this.rootStore.ticketStore.ticketsRegistry);
  }

  //Intiialize filitered tickets, a MAP of ITickets from the ticket store registry
  @observable filteredTickets: Map<number, ITicket> = observable.map(
    this.ticketsRegistry
  );

  //Copy ticketsRegistry into filteredTickets
  @action loadFilteredTickets = () => {
    this.filteredTickets = observable.map().merge(this.ticketsRegistry);
  };

  //The main method that filters the filteredTickets object.
  @action filterTickets = () => {
    //When run, first copy ticketsRegistry into filteredTickets again, resetig the object.
    this.loadFilteredTickets();

    //Filter status
    if (this.filters.status.length !== 0) {
      this.filterStatus(this.filters.status);
    }

    //Filter products
    if (this.filters.products.length !== 0) {
      this.filters.products.forEach((product) => {
        this.filterProduct(this.filters.products);
      });
    }

    //Filter dates
    this.filterTicketsByDate();
  };

  @action filterTicketsByDate = () => {
    this.filterDate(this.filters.dates.From, this.filters.dates.To);
  };

  @action selectAll = () => {
    this.loadFilteredTickets();
    this.filters = {
      status: [],
      products: [],
      dates: {
        From: minDate,
        To: maxDate,
      },
    };
  };

  @action changeStatus = (status: string, toAdd: boolean) => {
    if (toAdd) {
      this.filters.status.push(status);
    } else {
      this.filters.status = this.filters.status.filter((statusToRemove) => {
        return statusToRemove !== status;
      });
    }
  };

  @action changeProduct = (product: string, toAdd: boolean) => {
    if (toAdd) {
      this.filters.products.push(product);
    } else {
      this.filters.products = this.filters.products.filter(
        (productToRemove) => {
          return productToRemove !== product;
        }
      );
    }
  };

  @action changeFromDate = (date: number) => {
    if (date === null) {
      this.filters.dates.From = minDate;
    } else {
      this.filters.dates.From = date;
    }
  };

  @action changeToDate = (date: number) => {
    if (date === null) {
      this.filters.dates.To = maxDate;
    } else {
      this.filters.dates.To = date;
    }
  };

  @action filteredTicketsRemove = (id: string) => {
    // this.filteredTickets.delete(+id);
    this.filteredTickets.forEach((ticket) => {
      if (ticket.post_id?.toString() === id) {
        this.filteredTickets.delete(+id);
      }
    });
    this.rootStore.ticketStore.loadTickets();
  };

  //HELPER FUNCTIONS
  //Takes a filter criterion, and filters "tickets"
  filterStatus = (status: string[]) => {
    this.filteredTickets.forEach((ticket) => {
      if (!status.includes(ticket.status.status_text))
        this.filteredTickets.delete(ticket.post_id!);
    });
  };

  filterProduct = (product: string[]) => {
    this.filteredTickets.forEach((ticket) => {
      if (!product.includes(ticket.product.product_name)) {
        this.filteredTickets.delete(ticket.post_id!);
      }
    });
  };

  filterDate = (fromDate: number, toDate: number) => {
    this.filteredTickets.forEach((ticket) => {
      let ticketDate = Date.parse(ticket.date_time);
      if (!(ticketDate >= fromDate && ticketDate <= toDate))
        this.filteredTickets.delete(ticket.post_id!);
    });
  };
}
