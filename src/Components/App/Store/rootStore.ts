import { createContext } from "react";
import TicketStore from "./ticketStore";
import FilterStore from "./filterStore";
import ProductStore from "./productStore";
import UserStore from "./userStore";
import CommentStore from "./commentStore";

export class Store {
  ticketStore = new TicketStore(this);
  filterStore = new FilterStore(this);
  productStore = new ProductStore(this);
  userStore = new UserStore(this);
  commentStore = new CommentStore(this);
}

export default createContext(new Store());
