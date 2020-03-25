import { observable, action } from "mobx";
import Axios from "axios";

export interface BackupInfo {
  ip: string;
  name: string;
  folderName: string;
  date: string;
  size: number;
  storage: string;
  type: string;
}
export interface AliveInfo {
  ip: string;
  name: string;
  status: string;
}
export interface DiskInfo {
  ip: string;
  info: string;
  total: number;
  useable: number;
  percent: number;
  usableStorageSet: string;
  totalStorageSet: string;
}
export interface MemoryInfo {
  ip: string;
  info: string;
  total: number;
  useable: number;
  percent: number;
  usableStorageSet: string;
  totalStorageSet: string;
}

export interface SizeAndUnit {
  unit: string;
  size: number;
}

export class report {
  @observable public backUpList: Array<BackupInfo> = [];
  @observable public aliveList: Array<AliveInfo> = [];
  @observable public diskStateList: Array<DiskInfo> = [];
  @observable public memoryStateList: Array<MemoryInfo> = [];
  @observable public backUpSizeStorage = 0;
  @observable public backUpLoadingComplete = false;
  @observable public aliveLoadingComplete = false;
  @observable public aliveNot = false;
  @observable public resourceNot = false;
  @observable public backUpNot = false;
  @observable public fileInfoNot = false;
  @observable public resourceLoadingComplete = false;

  //Report

  //backup Report
  @action
  getBackUpInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/backup", {})
      .then(response => {
        if (response.data.length === 0) {
          this.fileInfoNot = true;
        }
        this.backUpList = [];
        let getbackup;
        for (
          let i = 0;
          i < response.data.length;
          i++ || response.data[i].path.length === 0
        ) {
          if (response.data[i].path === null) {
            continue;
          } else {
            let ipInfo = response.data[i].ip;
            for (let j = 0; j < response.data[i].path.length; j++) {
              let fileName = response.data[i].path[j].name;
              for (
                let k = 0;
                k < response.data[i].path[j].fileInfo.length;
                k++
              ) {
                let storageSet = "byte";
                this.backUpSizeStorage = 0;
                let fileTemp = response.data[i].path[j].fileInfo[k].size;
                let filesize = parseInt(this.getSize(fileTemp).toFixed(0));
                if (this.backUpSizeStorage === 0) {
                  storageSet = "byte";
                } else if (this.backUpSizeStorage === 1) {
                  storageSet = "KB";
                } else if (this.backUpSizeStorage === 2) {
                  storageSet = "MB";
                } else if (this.backUpSizeStorage === 3) {
                  storageSet = "GB";
                } else if (this.backUpSizeStorage === 4) {
                  storageSet = "TB";
                } else {
                  storageSet = "TB↑";
                }
                let tempDate = response.data[i].path[j].fileInfo[k].date.split(
                  "T"
                );
                let date = tempDate[0];
                let tempTime = tempDate[1].split(".");
                let time = tempTime[0];
                let resultDate = date + " " + time;
                getbackup = {
                  ip: ipInfo,
                  folderName: fileName,
                  name: response.data[i].path[j].fileInfo[k].name,
                  date: resultDate,
                  size: filesize,
                  type: response.data[i].path[j].fileInfo[k].type,
                  storage: storageSet
                };
                this.backUpList.push(getbackup);
              }
            }
          }
        }
        this.backUpLoadingComplete = true;
      })
      .catch(error => {});
  }
  getSize(size: number): number {
    if (size < 1024) {
      return size;
    } else {
      this.backUpSizeStorage++;
      return this.getSize(size / 1024);
    }
  }
  @action
  public async getBackUp() {
    await this.getBackUpInfo();
  }

  //aliveCheck
  @action
  getAliveCheckInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/ping", {})
      .then(response => {
        if (response.data.length === 0) {
          this.aliveNot = true;
        }
        this.aliveList = [];
        this.aliveList = response.data;
        this.aliveLoadingComplete = true;
      })
      .catch(error => {});
  }
  @action
  public async getAliveCheck() {
    await this.getAliveCheckInfo();
  }

  //ResourceCheck
  @action
  getResourceCheckInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/resource", {})
      .then(response => {
        this.diskStateList = [];
        this.memoryStateList = [];
        let memory;
        let disk;
        if (response.data.length === 0) {
          this.resourceNot = true;
        }
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].memoryState === null) {
            continue;
          } else {
            let ipvalue = response.data[i].ip;
            let usableStorageSet = "byte";
            let totalStorageSet = "byte";
            let useableSizeAndUnit = this.getstorageUnit(
              response.data[i].memoryState.usable
            );
            let totalSizeAndUnit = this.getstorageUnit(
              response.data[i].memoryState.total
            );
            usableStorageSet = useableSizeAndUnit.unit;
            totalStorageSet = totalSizeAndUnit.unit;
            let usable = useableSizeAndUnit.size;
            let total = totalSizeAndUnit.size;

            memory = {
              ip: ipvalue,
              info: response.data[i].memoryState.info,
              percent: response.data[i].memoryState.percent,
              total: total,
              useable: usable,
              usableStorageSet: usableStorageSet,
              totalStorageSet: totalStorageSet
            };
            this.memoryStateList.push(memory);
            for (let j = 0; j < response.data[i].diskStates.length; j++) {
              let usableStorageSet = "byte";
              let totalStorageSet = "byte";
              let useableSizeAndUnit = this.getstorageUnit(
                response.data[i].diskStates[j].usable
              );
              let totalSizeAndUnit = this.getstorageUnit(
                response.data[i].diskStates[j].total
              );
              usableStorageSet = useableSizeAndUnit.unit;
              totalStorageSet = totalSizeAndUnit.unit;
              let usable = useableSizeAndUnit.size;
              let total = totalSizeAndUnit.size;
              disk = {
                ip: ipvalue,
                info: response.data[i].diskStates[j].info,
                percent: response.data[i].diskStates[j].percent,
                total: total,
                useable: usable,
                usableStorageSet: usableStorageSet,
                totalStorageSet: totalStorageSet
              };
              this.diskStateList.push(disk);
            }
          }
        }
        this.resourceLoadingComplete = true;
      })
      .catch(error => {});
  }
  @action
  public async getResourceCheck() {
    await this.getResourceCheckInfo();
  }
  getstorageUnit(size: number): SizeAndUnit {
    let fileTemp = size;
    this.backUpSizeStorage = 0;
    let storageSet;
    let returnValue;
    let sizeValue = parseInt(this.getSize(fileTemp).toFixed(0));
    if (this.backUpSizeStorage === 0) {
      storageSet = "byte";
    } else if (this.backUpSizeStorage === 1) {
      storageSet = "KB";
    } else if (this.backUpSizeStorage === 2) {
      storageSet = "MB";
    } else if (this.backUpSizeStorage === 3) {
      storageSet = "GB";
    } else if (this.backUpSizeStorage === 4) {
      storageSet = "TB";
    } else {
      storageSet = "TB↑";
    }
    returnValue = {
      unit: storageSet,
      size: sizeValue
    };
    return returnValue;
  }
}
