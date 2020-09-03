import { action, observable, reaction, runInAction, computed } from "mobx";
import { Store } from "./rootStore";
import { IOption } from "../../../Models/options";
import { IACPSettings, IACPSettingsForm } from "../../../Models/acpSettings";
import { Admins } from "../../../API/agent";

export default class CommonStore {
  constructor(public rootStore: Store) {
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem("jwt");

  @observable appLoaded = false;

  @action setToken = (token: string) => {
    window.localStorage.setItem("jwt", token);
  };

  @action setAppLoaded = (appLoaded: boolean) => {
    this.appLoaded = appLoaded;
  };

  @observable ticketsFromProfile: boolean = false;

  @action setTicketsFromProfile = (bool: boolean) => {
    this.ticketsFromProfile = bool;
  };

  //Is Archived options
  @observable isArchivedOptions: IOption[] = [
    {
      key: 0,
      text: "Current",
      value: false,
    },
    {
      key: 1,
      text: "Archived",
      value: true,
    },
  ];

  @observable resourceLoading = false;

  @action setResourceLoading = (resourceLoading: boolean) => {
    this.resourceLoading = resourceLoading;
  };

  //ACP Settings
  @observable ACPSettings: IACPSettings | null = null;

  //Load ACP Settings
  @action loadACPSettings = async () => {
    try {
      this.resourceLoading = true;
      this.ACPSettings = await Admins.listACPSettings();
      runInAction(() => {
        this.resourceLoading = false;
      })
    } catch (e) {
      this.resourceLoading = false;
      console.log(e);
    }
  };

  //Registration locked
  @observable registration_is_locked: boolean = false;

  //Get registration locked
  @action loadRegitrationLocked = async () => {
    try {
      this.resourceLoading = true
      this.registration_is_locked = await Admins.getACPRegistrationLocked();
      runInAction(() => {
        this.resourceLoading = false;
      })
    } catch (e) {
      this.resourceLoading = false;
      console.log(e);
    }
  };

  //Edit ACP Settings
  @action editACPSettings = async (settings: IACPSettingsForm) => {
    try {
      this.resourceLoading = true;
      await Admins.editACPSettings(settings);
      runInAction(() => {
        this.resourceLoading = false;
      })
    } catch (e) {
      this.resourceLoading = false;
      console.log(e);
    }
  };

  @computed get adminOptions() {
    let returnArr: IOption[] = [];

    this.ACPSettings?.admin_list.forEach((admin) => {
      returnArr.push({
        key: admin.id!,
        text: admin.username,
        value: admin.id!,
      });
    });

    returnArr = returnArr.sort((u1, u2) =>
      ("" + u1.text).localeCompare(u2.text)
    );

    return returnArr;
  }

  registrationOptions: IOption[] = [
    {key: 0, text: "Enabled", value: false},
    {key: 1, text: "Disabled", value: true}
  ]
}
