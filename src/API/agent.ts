import axios, { AxiosResponse } from "axios";
import { ITicket } from "../Models/ticket";
import { IProduct } from "../Models/product";
import { IStatus } from "../Models/status";
import { IComment } from "../Models/comment";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Tickets = {
  list: (): Promise<ITicket[]>=> requests.get("/tickets"),
  details: (post_id : string): Promise<ITicket> => requests.get("/tickets/" + post_id),
  create: (ticket : ITicket) => requests.post("/tickets", ticket),
  edit: (ticket : ITicket) => requests.put("/tickets/" + ticket.post_id, ticket),
  delete: (post_id : string) => requests.delete("/tickets/" + post_id) 
}

const Comments = {
  create: (comment : IComment) => requests.post("/comments", comment),
  edit: (ticket : IComment) => requests.put("/comments/" + ticket.post_id, ticket),
  delete: (post_id : string) => requests.delete("/comments/" + post_id) 
}

const Products = {
  list: (): Promise<IProduct[]>=> requests.get("/products"),
  details: (product_id : string): Promise<ITicket> => requests.get("/products/" + product_id)
}

const Status = {
  list: (): Promise<IStatus[]>=> requests.get("/status"),
  details: (status_id : string): Promise<ITicket> => requests.get("/status/" + status_id)
}

export {Tickets, Comments, Products, Status};