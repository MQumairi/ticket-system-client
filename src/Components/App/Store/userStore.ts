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
import { IRoleForm } from "../../../Models/roleForm";
import { history } from "../../../index";

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
      this.rootStore.commonStore.setAppLoaded(false);
      this.user = await Users.login(userToLogin);
      runInAction(() => {
        if (this.user) {
          this.rootStore.commonStore.setToken(this.user.token);
          this.rootStore.commonStore.setAppLoaded(true);
          this.setLoginError(false);
          history.push("/tickets");
        }
      });
    } catch (e) {
      this.rootStore.commonStore.setAppLoaded(true);
      this.setLoginError(true);
      // throw e;
    }
  };

  //Login Error
  @observable loginError = false;

  @action setLoginError = (error: boolean) => {
    this.loginError = error;
    console.log("Login error is (from store) " + this.loginError);
  };

  //Logout
  @action logout = () => {
    this.user = null;
    window.localStorage.removeItem("jwt");
  };

  //Register
  @action register = async (values: IUserForm) => {
    try {
      this.rootStore.commonStore.setAppLoaded(false);
      this.user = await Users.register(values);
      runInAction(() => {
        if (this.user) this.rootStore.commonStore.setToken(this.user.token);
        this.rootStore.commonStore.setAppLoaded(true);
        this.setRegistrationError(null);
        history.push("/tickets");
      });
    } catch (e) {
      this.rootStore.commonStore.setAppLoaded(true);
      console.log("From store");
      console.log(e.message);
      runInAction(() => {
        this.registerationError = e.message;
      });
    }
  };

  @observable registerationError: string | null = null;

  @action setRegistrationError = (toSet: string | null) => {
    this.registerationError = toSet;
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
      this.rootStore.commonStore.setResourceLoading(true);
      const loadedUserList = await Admins.listUsers();
      runInAction(() => {
        loadedUserList.forEach((user) => {
          this.userList.set(user.id!, user);
        });
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  //User details for inspectedUsers
  @observable inspectedUser: IUser | null = null;

  //Get inspected user
  @action loadInspectedUser = async (userId: string) => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      this.inspectedUser = await Admins.userDetails(userId);
      runInAction(() => {
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
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

    returnArr = returnArr.sort((d1, d2) =>
      ("" + d1.text).localeCompare(d2.text)
    );

    return returnArr;
  }

  //List roles
  @observable roles = observable.map(new Map<string, IRole>());

  //Load roles
  @action loadRoles = async () => {
    try {
      this.rootStore.commonStore.setResourceLoading(true);
      const loadedRoles = await Admins.listRoles();
      runInAction(() => {
        loadedRoles.forEach((role) => {
          this.roles.set(role.id, role);
        });
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  //Role details
  @observable currentRole: IRole | null = null;

  //Get role details
  @action loadCurrentRole = async (roleId: string) => {
    this.rootStore.commonStore.setResourceLoading(true);
    try {
      this.currentRole = await Admins.roleDetails(roleId);
      runInAction(() => {
        this.rootStore.commonStore.setResourceLoading(false);
      });
    } catch (e) {
      this.rootStore.commonStore.setResourceLoading(false);
      console.log(e);
    }
  };

  //Current role's users
  // @observable currentRoleUsers = observable.map(new Map<string, IUser>());

  // //Get role's users
  // @action loadCurrentRoleUsers = async (roleName: string) => {
  //   this.rootStore.commonStore.setResourceLoading(true);
  //   try {
  //     let loadedRoleUsers = await Admins.listRoleUsers(roleName);
  //     runInAction(() => {
  //       this.currentRoleUsers.clear();
  //       loadedRoleUsers.forEach((user) => {
  //         this.currentRoleUsers.set(user.id!, user);
  //       });
  //       this.rootStore.commonStore.setResourceLoading(false);
  //     });
  //   } catch (e) {
  //     this.rootStore.commonStore.setResourceLoading(false);
  //     console.log(e);
  //   }
  // };

  //Add role
  @action addRole = async (roleForm: IRoleForm) => {
    try {
      await Admins.addRole(roleForm);
    } catch (e) {
      console.log(e);
    }
  };

  //Edit role
  @action editRole = async (roleId: string, roleForm: IRoleForm) => {
    try {
      await Admins.editRole(roleId, roleForm);
    } catch (e) {
      console.log(e);
    }
  };

  //Delete role
  @action deleteRole = async (roleId: string) => {
    try {
      await Admins.deleteRole(roleId);
      runInAction(() => {
        this.roles.delete(roleId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Assign role
  @action assignRole = async (userId: string, roleForm: IRoleForm) => {
    try {
      await Admins.assignRole(userId, roleForm);
    } catch (e) {
      console.log(e);
    }
  };

  //Unassign role
  @action unassignRole = async (userId: string, roleForm: IRoleForm) => {
    try {
      await Admins.unassignRole(userId, roleForm);
    } catch (e) {
      console.log(e);
    }
  };

  //User options
  @computed get userOptions() {
    let returnArr: IOption[] = [];

    this.userList.forEach((user) => {
      returnArr.push({
        key: user.id!,
        text: user.username,
        value: user.id!,
      });
    });

    returnArr = returnArr.sort((u1, u2) =>
      ("" + u1.text).localeCompare(u2.text)
    );

    return returnArr;
  }

  @computed get roleFullUserListOptions() {
    let returnArr: IOption[] = [];

    this.currentRole?.userList.forEach((user) => {
      returnArr.push({
        key: user.id!,
        text: user.username,
        value: user.id!,
      });
    });

    returnArr = returnArr.sort((u1, u2) =>
      ("" + u1.text).localeCompare(u2.text)
    );

    return returnArr;
  }
}
