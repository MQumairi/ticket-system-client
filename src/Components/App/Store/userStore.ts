import { observable, action, computed, runInAction } from "mobx";
import { IUser } from "../../../Models/user";
import { Store } from "./rootStore";
import { IUserForm } from "../../../Models/userForm";
import { Users } from "../../../API/agent";

export default class UserStore {
  constructor(public rootStore: Store) {}

  @observable user: IUser | null = null;

  @computed get isLogged() {
    return !!this.user;
  }

  @action login = async (values: IUserForm) => {
    const userToLogin: IUserForm = {
      email: values.email,
      password: values.password,
    };
    try {
      this.user = await Users.login(userToLogin);
      this.rootStore.commonStore.setToken(this.user.token);
    } catch (e) {
      throw e;
    }
  };

  @action logout = () => {
    this.user = null;
    window.localStorage.removeItem("jwt");
  };

  @action getCurrentUser = async () => {
    try {
      const user = await Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (e) {
      console.log(e);
    }
  };
}
