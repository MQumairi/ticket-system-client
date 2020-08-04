import { observable, action } from "mobx";
import { IUser } from "../../../Models/user";
import { Store } from "./rootStore";

export default class UserStore {
  constructor(public rootStore: Store) {}

  @observable userList: IUser[] = [
    {
      id: "2980dd9d-26ad-46b3-baa9-01276ff20162",
      username: "BILLY",
      email: "pb@email.com",
      avatar:
        "https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3750&q=80",
    },
    {
      id: "932cbaed-0393-4e27-9d19-7d19711e1323",
      username: "Toshi",
      email: "tt@email.com",
      avatar:
        "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80",
    },
  ];

  @action getUser = (id: string) => {
    return this.userList.find((user) => user.id === id);
  };

  @observable currentUser: IUser | null | undefined = this.getUser("2980dd9d-26ad-46b3-baa9-01276ff20162");

  @action setCurrentUser = () => {
    this.currentUser = this.getUser("2980dd9d-26ad-46b3-baa9-01276ff20162");
  }
}
