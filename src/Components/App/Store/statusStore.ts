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

  //TICKET OPTIONS FOR SELECTOR... coming soon
    // @computed get statusOptions() {
  //   let returnArr: IOption[] = [];

  //   this.statuses.forEach((status) => {
  //     returnArr.push({
  //       key: status.status_id!,
  //       text: status.status_text,
  //       value: status.status_text,
  //     });
  //   });

  //   return returnArr;
  // }

}

