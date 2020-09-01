import axios, { AxiosResponse } from "axios";
import { ITicket } from "../Models/ticket";
import { IProduct } from "../Models/product";
import { IStatus } from "../Models/status";
import { IUser } from "../Models/user";
import { IUserForm } from "../Models/userForm";
import { IUserFormGeneral } from "../Models/userFormGeneral";
import { ITicketForm } from "../Models/ticketForm";
import { IRole } from "../Models/role";
import { IRoleForm } from "../Models/roleForm";
import { IFilters } from "../Models/filters";
import {history} from "../index";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {

  const {status} = error.response;

  if(status === 404) {
    history.push("/notfound")
  }

  if(status === 400) {
    let error_message : string = String(Object.values(error.response.data.errors)[0]);
    throw Error(error_message);
  }

  if(status === 401) {
    toast.error("Please login");
    history.push("/login");
  }

  if(status === 403) {
    toast.error("Unauthorized");
    history.push("/unauthorized");
  }

  if(status === 500) {
    toast.error("Server error");
  }

  if(error.message === "Network Error") {
    toast.error("Failed to connect to server.")
  }

});

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const sleep = (ms: number) => (response: AxiosResponse) => {
  return new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
};

const responseBody = (response: AxiosResponse) => response.data;

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  get_with_body: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  post_form: (url: string, body: {}) =>
    axios.post(url, body, config).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  put_form: (url: string, body: {}) =>
    axios.put(url, body, config).then(sleep(1000)).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Tickets = {
  list: (): Promise<ITicket[]> => requests.get("/tickets"),
  details: (post_id: string): Promise<ITicket> =>
    requests.get("/tickets/" + post_id),
  create: (ticket: FormData) => requests.post_form("/tickets", ticket),
  edit: (ticket_id: string, ticket: FormData) =>
    requests.put_form("/tickets/" + ticket_id, ticket),
  delete: (post_id: string) => requests.delete("/tickets/" + post_id),
  filter: (filters: IFilters): Promise<ITicket[]> =>
    requests.get_with_body("/tickets/filter", filters),
};

const Comments = {
  create: (comment: FormData) => requests.post_form("/comments", comment),
  edit: (commentId: string, comment: FormData) =>
    requests.put_form("/comments/" + commentId, comment),
  delete: (post_id: string) => requests.delete("/comments/" + post_id),
};

const Products = {
  list: (): Promise<IProduct[]> => requests.get("/products"),
  details: (product_id: string): Promise<ITicket> =>
    requests.get("/products/" + product_id),
  add: (product: IProduct) => requests.post("/products", product),
  edit: (product_id: string, product: IProduct) =>
    requests.put("/products/" + product_id, product),
  delete: (product_id: string) => requests.delete("/products/" + product_id),
};

const Status = {
  list: (): Promise<IStatus[]> => requests.get("/status"),
  details: (status_id: string): Promise<ITicket> =>
    requests.get("/status/" + status_id),
  add: (status: IStatus) => requests.post("/status", status),
  edit: (status_id: string, status: IStatus) =>
    requests.put("/status/" + status_id, status),
  delete: (status_id: string) => requests.delete("/status/" + status_id),
};

const Users = {
  current: (): Promise<IUser> => requests.get("/users/profile"),
  login: (user: IUserForm): Promise<IUser> =>
    requests.post("/users/login", user),
  register: (user: IUserForm): Promise<IUser> =>
    requests.post("/users/register", user),
  editProfile: (user: IUserFormGeneral) => requests.put("/users/profile", user),
  addAvatar: (avatar: FormData) => requests.post_form("/avatars", avatar),
};

const Developers = {
  List: (): Promise<IUser[]> => requests.get("/developers"),
  listAssignedTickets: (dev_id: string): Promise<ITicket[]> =>
    requests.get("/developers/" + dev_id + "/tickets"),
  manage: (post_id: string, ticket: ITicketForm) =>
    requests.put("/tickets/" + post_id + "/manage", ticket),
};

const Admins = {
  listUsers: (): Promise<IUser[]> => requests.get("/users/list"),
  userDetails: (userId: string): Promise<IUser> =>
    requests.get("/users/" + userId),
  editUser: (userId: string, user: IUserFormGeneral) =>
    requests.put("/users/" + userId, user),
  deleteUser: (userId: string) => requests.delete("/users/" + userId),
  deleteAvatar: (avatarId: string) => requests.delete("/avatars/" + avatarId),
  listRoles: (): Promise<IRole[]> => requests.get("/roles"),
  roleDetails: (roleId: string): Promise<IRole> =>
    requests.get("/roles/" + roleId),
  listRoleUsers: (roleName: string): Promise<IUser[]> =>
    requests.get("/users/list/" + roleName),
  assignRole: (userId: string, roleForm: IRoleForm) =>
    requests.put("/users/" + userId + "/assign", roleForm),
  unassignRole: (userId: string, roleForm: IRoleForm) =>
    requests.put("/users/" + userId + "/unassign", roleForm),
  editRole: (roleId: string, roleForm: IRoleForm) =>
    requests.put("/roles/" + roleId, roleForm),
  deleteRole: (roleId: string) => requests.delete("/roles/" + roleId),
  addRole: (roleForm: IRoleForm) => requests.post("/roles", roleForm),
};

const Archives = {
  list: () => requests.get("/archives"),
};

export {
  Tickets,
  Comments,
  Products,
  Status,
  Users,
  Developers,
  Admins,
  Archives,
};
