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

interface IStatus {
  id: number;
  name: string;
  color: string;
}

interface IOption {
  key: number;
  text: string;
  value: string;
}

export default class FilterStore {

  constructor(public rootStore: Store) {}

  @observable ticketsRegistry = this.rootStore.ticketStore.ticketsRegistry;

  // @observable filteredTickets: ITicket[] = [...this.tickets];
  @observable filteredTickets: Map<number, ITicket> = {...this.ticketsRegistry};

  @observable filters: filterObject = {
    status: [],
    products: [],
    dates: {
      From: "0001-01-01",
      To: "9999-12-30",
    },
  };

  @observable stati: IStatus[] = [
    {
      id: 1,
      name: "Urgent",
      color: "#d80000",
    },
    {
      id: 2,
      name: "Low",
      color: "#e68a00",
    },
    {
      id: 3,
      name: "Pending",
      color: "#f3cb16",
    },
    {
      id: 4,
      name: "Done",
      color: "#45B510",
    },
  ];

  //COMPUTED
  @computed get statusOptions() {
    let returnArr: IOption[] = [];

    this.stati.forEach((status) => {
      returnArr.push({
        key: status.id,
        text: status.name,
        value: status.name,
      });
    });

    return returnArr;
  }

  //ACTIONS
  @action filterTickets = () => {

    //Reset
    this.filteredTickets = this.ticketsRegistry;

    //Filter status
    if (this.filters.status.length !== 0) {
      this.filterStatus(
        this.filters.status,
      );
    }

    if (this.filters.products.length !== 0) {
      this.filters.products.forEach((product) => {
        this.filterProduct(
          this.filters.products,
        );
      });
    }
    //Filter dates
    this.filterTicketsByDate();
  };

  @action filterTicketsByDate = () => {
    this.filterDate(
      this.filters.dates.From,
      this.filters.dates.To,
    );
  };

  @action selectAll = () => {

    console.log("----------------")
    console.log("From Filter Store's (Tickets, before)")
    console.log(this.ticketsRegistry.size);
    console.log("From Filter Store's (filteredTickets, before)")
    console.log(this.filteredTickets.size);

    this.filteredTickets = this.ticketsRegistry;
    this.filters = {
      status: [],
      products: [],
      dates: {
        From: "0001-01-01",
        To: "9999-12-30",
      },
    };

    console.log("----------------")
    console.log("From Filter Store's (Tickets, after)")
    console.log(this.ticketsRegistry.size);
    console.log("From Filter Store's (filteredTickets, after)")
    console.log(this.filteredTickets.size);
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
    this.ticketsRegistry.forEach((ticket) => {
      if(!status.includes(ticket.status.status_text)) this.ticketsRegistry.delete(ticket.post_id!);
    })
  };

  filterProduct = (product: string[]) => {
    this.ticketsRegistry.forEach((ticket) => {
      if(!product.includes(ticket.product.product_name)) this.ticketsRegistry.delete(ticket.post_id!);
    })
  };

  filterDate = (
    fromDate: string,
    toDate: string,
  ) => {
    this.ticketsRegistry.forEach((ticket) => {
      if(!(ticket.date_time >= fromDate && ticket.date_time <= toDate)) this.ticketsRegistry.delete(ticket.post_id!)
    })
  };
}