import { observable, action } from "mobx";
import Axios from "axios";
import { ServerList, MemoryInfo } from "./host";
import moment from "moment";

export class server {
  @observable public memoryData: Array<number> = [];
  @observable public memoryNowTime = 10;
  @observable public timeData = ["start"];
  @observable public storageData = [0];
  @observable public storageTimeData = ["start"];
  @observable public storageDiskNumber = 0;
  @observable public serverMemoryInfoLoading = false;
  @observable public serverStorageInfoLoading = false;
  @observable public memoryPercent: Array<number> = [];
  @observable public storagePercent: Array<number> = [];
  @observable public storageDiskTotal: Array<Array<number>> = [[], []];
  @observable public storageTimeTotal: Array<Array<string>> = [
    this.storageTimeData
  ];
  public nowInfo = 0;
  memoryNowInfo = 0;
  storageNowInfo = 0;
  public storageNowCollect = [0];
  @observable public count = 0;
  @action
  getMemoryPercentInfo(ip: string) {
    return Axios.get(
      "http://192.168.0.68:8765/v1/host-status/resource/" +
        ip +
        "/memoryState/percent"
    )
      .then(response => {
        this.nowInfo = response.data;
        this.memoryNowInfo = response.data;
        this.memoryData.push(response.data);
        this.timeData.push(moment().format("LTS"));
      })
      .catch(error => {});
  }
  @action
  public async getMemoryPercent(ip: string) {
    await this.getMemoryPercentInfo(ip);
  }
  @action
  getstoragePercentInfo(ip: string, name: string) {
    return Axios.get(
      "http://192.168.0.68:8765/v1/host-status/resource/" +
        ip +
        "/diskStates/info?info=" +
        name
    )
      .then(response => {
        this.nowInfo = response.data.percent;
        this.storageNowInfo = response.data.percent;
      })
      .catch(error => {});
  }
  @action
  public async getstoragePercent(ip: string, name: string) {
    // eslint-disable-next-line
    await this.getstoragePercentInfo(ip, name);
  }

  getTotalMemoryPercentInfo(serverList: Array<ServerList>) {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/resource/")
      .then(response => {
        for (let i = 0; i < serverList.length; i++) {
          const nowPercentIndex = response.data.findIndex((v: MemoryInfo) => {
            return v.ip === serverList[i].ip;
          });
          if (
            nowPercentIndex === -1 ||
            response.data[nowPercentIndex].memoryState === null
          ) {
            this.nowMemoryPercent.push(888);
            this.nowStoragePercent.push(888);
          } else {
            this.nowMemoryPercent.push(
              response.data[nowPercentIndex].memoryState.percent
            );
            this.nowStoragePercent.push(
              response.data[nowPercentIndex].diskStates[0].percent
            );
          }
        }
      })
      .catch(error => {});
  }
  private nowMemoryPercent: Array<number> = [];
  private nowStoragePercent: Array<number> = [];
  @action
  public async getTotalMemoryPercent(serverList: Array<ServerList>) {
    this.nowMemoryPercent = [];
    this.nowStoragePercent = [];
    // eslint-disable-next-line
    await this.getTotalMemoryPercentInfo(serverList);

    this.memoryPercent = this.nowMemoryPercent.slice();
    this.storagePercent = this.nowStoragePercent.slice();
    this.serverMemoryInfoLoading = true;
    this.serverStorageInfoLoading = true;
    this.nowMemoryPercent = [];
    this.nowStoragePercent = [];
  }

  getTotalStoragePercentInfo(ip: string, name: string) {
    return Axios.get(
      "http://192.168.0.68:8765/v1/host-status/resource/" +
        ip +
        "/diskStates/info/percent?info=" +
        name
    )
      .then(response => {
        this.storagePercent.push(Number(response.data));
      })
      .catch(error => {});
  }
  @action
  public async getTotalStoragePercent(
    serverList: Array<ServerList>,
    name: string
  ) {
    this.storagePercent = [];
    for (let i = 0; i < serverList.length; i++) {
      await this.getTotalStoragePercentInfo(serverList[i].ip, name);
    }
  }
}
