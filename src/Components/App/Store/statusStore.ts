//Don't forget to:
// -- install mobx and mobx-react-lite (the latter for observers)
// -- use observables for states, and actions to mutate
// -- useContext in relevant components
// -- deconstruct the store
// -- set the component as an observer by wraping when export with observer(componentName).
import { observable, action } from "mobx";
import { Store } from "./rootStore";
import { IStatus } from "../../../Models/status";
import { Status } from "../../../API/agent";

export default class StatusStore {
  constructor(public rootStore: Store) {}

  //Initialziing an array of Statuses as found on DB
  @observable statuses: IStatus[] = [];

  //Loading the DB statuses into that array
  @action loadStatuses = async () => {
    try {
        this.statuses = await Status.list();
    }
    catch(e) {
        console.log(e);
    }
  }
}

