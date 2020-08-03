import { observable, action, computed } from "mobx";
import { ITicket } from "../../../Models/ticket";
import { Store } from "./rootStore";

interface filterObject {
  status: string[];
  products: string[];
  dates: {
    From: string;
    To: string;
  };
}

export default class FilterStore {
  constructor(public rootStore: Store) {}

  //IMPORTS FROM OTHER STORES

  //Getting the ticketRegistery from the ticketStore
  @computed get ticketsRegistry() {
    return observable.map(this.rootStore.ticketStore.ticketsRegistry);
  } 

  //Getting the statuses from the statusStore
  @observable statuses = this.rootStore.statusStore.statuses;

  //LOGIC

  //Initialize a filterobject. This will store active filters.
  @observable filters: filterObject = {
    status: [],
    products: [],
    dates: {
      From: "0001-01-01",
      To: "9999-12-30",
    },
  };

  //Intiialize filitered tickets, a MAP of ITickets
  @observable filteredTickets: Map<number, ITicket> = new Map<number, ITicket>();

  //Copy ticketsRegistry into filteredTickets
  @action loadFilteredTickets = (tickets: Map<number, ITicket>) => {
    let ticketsToReturn: Map<number, ITicket> = new Map<number, ITicket>();
    ticketsToReturn = observable.map().merge(this.ticketsRegistry);
    this.filteredTickets = ticketsToReturn;
  };

  //The main method that filters the filteredTickets object.
  @action filterTickets = () => {
    //When run, first copy ticketsRegistry into filteredTickets again, resetig the object.
    this.loadFilteredTickets(this.ticketsRegistry);

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
    console.log('select all clicked')
    console.log(this.ticketsRegistry.size)
    console.log(this.filteredTickets.size)
    this.loadFilteredTickets(this.ticketsRegistry);
    this.filters = {
      status: [],
      products: [],
      dates: {
        From: "0001-01-01",
        To: "9999-12-30",
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

  @action changeFromDate = (date: string) => {
    if (date === "") {
      this.filters.dates.From = "0001-01-01";
    } else {
      this.filters.dates.From = date;
    }
  };

  @action changeToDate = (date: string) => {
    if (date === "") {
      this.filters.dates.To = "9999-12-30";
    } else {
      this.filters.dates.To = date;
    }
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
      if (!product.includes(ticket.product.product_name))
        this.filteredTickets.delete(ticket.post_id!);
    });
  };

  filterDate = (fromDate: string, toDate: string) => {
    this.filteredTickets.forEach((ticket) => {
      if(!(ticket.date_time >= fromDate && ticket.date_time <= toDate)) this.filteredTickets.delete(ticket.post_id!)
    });
  };
}
