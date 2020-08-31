import { observable, action, computed, runInAction } from "mobx";
import { Store } from "./rootStore";
import { IStatus } from "../../../Models/status";
import { Status } from "../../../API/agent";
import { IOption } from "../../../Models/options";

export default class StatusStore {
  constructor(public rootStore: Store) {}

  //Initialziing an array of Statuses as found on DB
  @observable statuses: IStatus[] = [];

  //Loading the DB statuses into that array
  @action loadStatuses = async () => {
    try {
      this.statuses = await Status.list();
      runInAction(() => {
        this.statuses = this.statuses.sort((s1, s2) => ('' + s1.status_text).localeCompare(s2.status_text));
      })
    } catch (e) {
      console.log(e);
    }
  };

  //Add status
  @action addStatus = async (status: IStatus) => {
    try {
      await Status.add(status);
      runInAction(() => {
        this.statuses.push(status);
      });
    } catch (e) {
      console.log(e);
    }
  };


  @action editStatus = async (status_id: string, status: IStatus) => {
    try {
      await Status.edit(status_id, status);
    } catch(e) {
      console.log(e);
    }
  }


  @action deleteStatus = async (status_id: string) => {
    try {
      await Status.delete(status_id);
      runInAction(() => {
        this.statuses = this.statuses.filter(
          (status) => status.status_id?.toString() !== status_id
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  //Tickt options for selector inputs
  @computed get statusOptions() {
    let returnArr: IOption[] = [];

    this.statuses.forEach((status) => {
      returnArr.push({
        key: status.status_id!,
        text: status.status_text,
        value: status,
      });
    });

    returnArr = returnArr.sort((s1, s2) => ('' + s1.text).localeCompare(s2.text));

    return returnArr;
  }

  @computed get status_ids() {
    let returnArr: number[] = [];

    this.statuses.forEach((status) => {
      returnArr.push(status.status_id!);
    })

    return returnArr;
  }

  statusIsDefaultOptions : IOption[] = [
    {key: 0, text: "Default", value: true},
    {key: 1, text: "Regular", value: false}
  ]
}
