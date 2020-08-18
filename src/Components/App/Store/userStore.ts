import { observable, action, computed, runInAction } from "mobx";
import { IUser } from "../../../Models/user";
import { Store } from "./rootStore";
import { IUserForm } from "../../../Models/userForm";
import { Users } from "../../../API/agent";
import { IUserFormGeneral } from "../../../Models/userFormGeneral";

export default class UserStore {
  constructor(public rootStore: Store) {}

  @observable user: IUser | null = null;

  @computed get isLogged() {
    return !!this.user;
  }

  //Login
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

  //Logout
  @action logout = () => {
    this.user = null;
    window.localStorage.removeItem("jwt");
  };

  //Register
  @action register = async (values: IUserForm) => {
    try {
      this.user = await Users.register(values);
      this.rootStore.commonStore.setToken(this.user.token);
    } catch (e) {
      console.log(e);
    }
  };

  //Current User
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

  //Edit Profile
  @action editProfile = async (user: IUserFormGeneral) => {
    try {
      await Users.editProfile(user).then(() => {
        runInAction(() => {
          this.getCurrentUser();
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Upload Avatar
  @action addAvatar = async (avatar: FormData) => {
    try {
      await Users.addAvatar(avatar).then(() => {
        runInAction(() => {
          this.getCurrentUser();
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
}
