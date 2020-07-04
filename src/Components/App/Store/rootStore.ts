import { createContext } from "react";
import { observable, action } from "mobx";
import TicketStore from "./ticketStore";
import FilterStore from "./filterStore";
import ProductStore from "./productStore";

export class Store {
  ticketStore = new TicketStore(this);
  filterStore = new FilterStore(this);
  productStore = new ProductStore(this);

  @observable title = "Hello from MobX";

  @action setTitle = () => {
    this.title = "Changed Mobx";
  };
}

export default createContext(new Store());
