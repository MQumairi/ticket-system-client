import { observable, action, computed, runInAction } from "mobx";
import { IUser } from "../../../Models/user";
import { Store } from "./rootStore";
import { IUserForm } from "../../../Models/userForm";
import { Users, Admins } from "../../../API/agent";
import { Developers } from "../../../API/agent";
import { IUserFormGeneral } from "../../../Models/userFormGeneral";
import { ITicket } from "../../../Models/ticket";
import { format } from "date-fns";
import { IOption } from "../../../Models/options";
import { IRole } from "../../../Models/role";

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

  //Users on the system
  @observable userList = observable.map(new Map<string, IUser>());

  //List users
  @action loadUserList = async () => {
    try {
      const loadedUserList = await Admins.listUsers();
      runInAction(() => {
        loadedUserList.forEach((user) => {
          this.userList.set(user.id!, user);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  //User details for inspectedUsers
  @observable inspectedUser: IUser | null = null;

  //Get inspected user
  @action loadInspectedUser = async (userId: string) => {
    try {
      this.inspectedUser = await Admins.userDetails(userId);
    } catch (e) {
      console.log(e);
    }
  };

  //Edit users
  @action editUser = async (userId: string, userData: IUserFormGeneral) => {
    try {
      await Admins.editUser(userId, userData);
    } catch (e) {
      console.log(e);
    }
  };

  //Delete users
  @action deleteUser = async (userId: string) => {
    try {
      await Admins.deleteUser(userId).then(() => {
        this.userList.delete(userId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Delete user avatar
  @action deleteAvatar = async (avatarId: string) => {
    try {
      await Admins.deleteAvatar(avatarId);
    } catch (e) {
      console.log(e);
    }
  };

  //Developers
  @observable developers = observable.map(new Map<string, IUser>());

  //List Developers
  @action loadDevelopers = async () => {
    try {
      const loadedDevelopers = await Developers.List();
      runInAction(() => {
        loadedDevelopers.forEach((developer) => {
          this.developers.set(developer.id!, developer);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Developers' assigned ticket
  @observable devTicketsRegistry = observable.map(new Map<number, ITicket>());

  //List Developer's tickets
  @action loadDevTickets = async (dev_id: string) => {
    try {
      const loadedTickets = await Developers.listAssignedTickets(dev_id);
      runInAction(() => {
        loadedTickets.forEach((ticket) => {
          let ticketDate = Date.parse(ticket.date_time);
          ticket.display_date = format(ticketDate, "dd/MM/yyyy");
          this.devTicketsRegistry.set(ticket.post_id!, ticket);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  @computed get developerOptions() {
    let returnArr: IOption[] = [];
    this.developers.forEach((developer) => {
      returnArr.push({
        key: developer.id!,
        text: developer.username,
        value: developer.id!,
      });
    });

    return returnArr;
  }

  //List roles
  @observable roles = observable.map(new Map<string, IRole>());

  //Load roles
  @action loadRoles = async () => {
    try {
      const loadedRoles = await Admins.listRoles();
      runInAction(() => {
        loadedRoles.forEach((role) => {
          this.roles.set(role.id, role);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Role details
  @observable currentRole: IRole | null = null;

  //Get role details
  @action loadCurrentRole = async (roleId: string) => {
    try {
      this.currentRole = await Admins.roleDetails(roleId);
    } catch (e) {
      console.log(e);
    }
  };
}
