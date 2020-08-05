import { action, observable, reaction } from "mobx";
import { Store } from "./rootStore";

export default class CommonStore {

  constructor(public rootStore: Store) {
    reaction(
      () => this.token,
      (token) => {
          if(token) {
              window.localStorage.setItem("jwt", token);
          }
          else {
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

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
