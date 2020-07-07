import { observable, action } from "mobx";
import { IUser } from "../../../Models/user";
import { Store } from "./rootStore";

export default class UserStore {

  constructor(public rootStore: Store) {}

  @observable userList: IUser[] = [
    {
      id: 1,
      firstName: "Pablo",
      lastName: "Bunjigen",
      email: "pb@email.com",
      rank: "System Admin",
      avatar: "https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3750&q=80",
    },
  ];

  @action getUser = (id: string) => {
    let query = Number(id);
    return this.userList.find((user) => {
        return user.id === query;
    });
  };
}