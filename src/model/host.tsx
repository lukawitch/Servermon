import { observable, action } from "mobx";
import Axios from "axios";

export interface ServerList {
  name: string;
  ip: string;
  monitoringStatus: string;
  monitoringIgnoreTime?: any;
  hostAliveCheckTimeOnOff?: string;
  hostAliveCheckStartTime: string;
  hostAliveCheckStopTime: string;
  mode: string;
}

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
export class host {
  @observable public serverListNum = 888;
  @observable public hostListNum = 0;
  @observable public address = "";
  @observable public name = "";
  @observable public mode = "";
  @observable public aliveCheckStartHour = "";
  @observable public aliveCheckStartMin = "";
  @observable public aliveCheckStopHour = "";
  @observable public aliveCheckStopMin = "";
  @observable public settingFileInfoSize = "";
  @observable public settingDiskUse = "";
  @observable public settingDiskPercent = "";
  @observable public settingMemoryUse = "";
  @observable public settingMemoryPercent = "";
  @observable public settingSeleteNow = "";
  @observable public objectHaveOrNot = false;
  @observable public serverLoadingComplete = false;
  @observable public storageDiskName: Array<string> = [];
  @observable public settingmemoryData: Array<number> = [];
  @observable public backUpSizeStorage = 0;
  @observable public emailBeforeData = "";

  @observable public hostInfo: ServerList = {
    name: "",
    ip: "",
    monitoringStatus: "",
    hostAliveCheckTimeOnOff: "",
    mode: "",
    hostAliveCheckStartTime: "0:0",
    hostAliveCheckStopTime: "0:0"
  };

  @observable public serverList: Array<ServerList> = [];
  @observable public hostAliveList: AliveInfo = {
    ip: "",
    name: "",
    status: ""
  };
  @observable public hostDiskStateList: Array<DiskInfo> = [];
  @observable public hostDiskNameList: Array<string> = [];
  @observable public hostMemoryStateList: Array<MemoryInfo> = [];
  @observable public hostBackUpList: Array<BackupInfo> = [];
  @action

  //hostSetting

  //host의 기본정보 가져오기
  @action
  getHostSettingInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/hosts", {})
      .then(response => {
        if (response.data.length === 0) {
          this.objectHaveOrNot = true;
        }
        this.serverList = [];
        let getHost;
        let onoff;
        let time;
        let startTime;
        let stopTime;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].monitoringIgnoreTime === null) {
            onoff = "off";
            time = "";
            startTime = "";
            stopTime = "";
          } else {
            onoff = "on";
            time = response.data[i].monitoringIgnoreTime.split("-");
            startTime = time[0];
            stopTime = time[1];
          }
          getHost = {
            name: response.data[i].name,
            ip: response.data[i].ip,
            monitoringStatus: response.data[i].monitoringStatus,
            hostAliveCheckTimeOnOff: onoff,
            mode: response.data[i].mode,
            monitoringIgnoreTime: time,
            hostAliveCheckStartTime: startTime,
            hostAliveCheckStopTime: stopTime
          };
          this.serverList.push(getHost);
        }
        this.serverLoadingComplete = true;
      })
      .catch(error => {});
  }
  @action
  public async getHostSetting() {
    await this.getHostSettingInfo();
  }

  //host 추가하는 부분
  @action
  addHostInfo(hostInfo: ServerList) {
    return Axios.post("http://192.168.0.68:8765/v1/hosts/" + hostInfo.ip, {
      ip: hostInfo.ip,
      name: hostInfo.name,
      mode: hostInfo.mode
    })
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async addHost(hostInfo: ServerList) {
    await this.addHostInfo(hostInfo);
  }
  //host 하나 삭제
  @action
  deleteHostInfo(host: string) {
    return Axios.delete("http://192.168.0.68:8765/v1/hosts/" + host)
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async deleteHost(host: string) {
    await this.deleteHostInfo(host);
  }

  //host 전체삭제
  @action
  deleteHostInfoAll() {
    return Axios.delete("http://192.168.0.68:8765/v1/hosts")
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async deleteHostAll() {
    await this.deleteHostInfoAll();
  }

  //host aliveCheck
  @action
  getHostAliveCheckInfo(ip: string) {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/ping/" + ip, {})
      .then(response => {
        this.hostAliveList = response.data;
      })
      .catch(error => {});
  }
  @action
  public async getHostAliveCheck(ip: string) {
    await this.getHostAliveCheckInfo(ip);
  }

  //host ResourceCheck
  @action
  getHostResourceCheckInfo(ip: string) {
    return Axios.get(
      "http://192.168.0.68:8765/v1/host-status/resource/" + ip,
      {}
    )
      .then(response => {
        this.hostDiskStateList = [];
        this.hostMemoryStateList = [];
        let memory;
        let disk;
        let ipvalue = response.data.ip;
        let usableStorageSet = "byte";
        let totalStorageSet = "byte";
        let useableSizeAndUnit = this.getStorageUnit(
          response.data.memoryState.usable
        );
        let totalSizeAndUnit = this.getStorageUnit(
          response.data.memoryState.total
        );
        usableStorageSet = useableSizeAndUnit.unit;
        totalStorageSet = totalSizeAndUnit.unit;
        let usable = useableSizeAndUnit.size;
        let total = totalSizeAndUnit.size;

        memory = {
          ip: ipvalue,
          info: response.data.memoryState.info,
          percent: response.data.memoryState.percent,
          total: total,
          useable: usable,
          usableStorageSet: usableStorageSet,
          totalStorageSet: totalStorageSet
        };
        this.hostMemoryStateList.push(memory);
        for (let j = 0; j < response.data.diskStates.length; j++) {
          let usableStorageSet = "byte";
          let totalStorageSet = "byte";
          let useableSizeAndUnit = this.getStorageUnit(
            response.data.diskStates[j].usable
          );
          let totalSizeAndUnit = this.getStorageUnit(
            response.data.diskStates[j].total
          );
          usableStorageSet = useableSizeAndUnit.unit;
          totalStorageSet = totalSizeAndUnit.unit;
          let usable = useableSizeAndUnit.size;
          let total = totalSizeAndUnit.size;
          this.storageDiskName.push(response.data.diskStates[j].info);
          disk = {
            ip: ipvalue,
            info: response.data.diskStates[j].info,
            percent: response.data.diskStates[j].percent,
            total: total,
            useable: usable,
            usableStorageSet: usableStorageSet,
            totalStorageSet: totalStorageSet
          };
          this.hostDiskStateList.push(disk);
        }
      })
      .catch(error => {});
  }
  @action
  public async getHostResourceCheck(ip: string) {
    await this.getHostResourceCheckInfo(ip);
  }

  //host ResourceCheck
  @action
  getHostResourceCheckReportInfo(ip: string) {
    return Axios.get(
      "http://192.168.0.68:8765/v1/host-status/resource/" + ip,
      {}
    )
      .then(response => {
        this.hostDiskStateList = [];
        this.hostMemoryStateList = [];
        let memory;
        let disk;
        let ipvalue = response.data.ip;
        let usableStorageSet = "byte";
        let totalStorageSet = "byte";
        let useableSizeAndUnit = this.getStorageUnit(
          response.data.memoryState.usable
        );
        let totalSizeAndUnit = this.getStorageUnit(
          response.data.memoryState.total
        );
        usableStorageSet = useableSizeAndUnit.unit;
        totalStorageSet = totalSizeAndUnit.unit;
        let usable = useableSizeAndUnit.size;
        let total = totalSizeAndUnit.size;

        memory = {
          ip: ipvalue,
          info: response.data.memoryState.info,
          percent: response.data.memoryState.percent,
          total: total,
          useable: usable,
          usableStorageSet: usableStorageSet,
          totalStorageSet: totalStorageSet
        };
        this.hostMemoryStateList.push(memory);
        for (let j = 0; j < response.data.diskStates.length; j++) {
          let usableStorageSet = "byte";
          let totalStorageSet = "byte";
          let useableSizeAndUnit = this.getStorageUnit(
            response.data.diskStates[j].usable
          );
          let totalSizeAndUnit = this.getStorageUnit(
            response.data.diskStates[j].total
          );
          usableStorageSet = useableSizeAndUnit.unit;
          totalStorageSet = totalSizeAndUnit.unit;
          let usable = useableSizeAndUnit.size;
          let total = totalSizeAndUnit.size;
          this.storageDiskName.push(response.data.diskStates[j].info);
          disk = {
            ip: ipvalue,
            info: response.data.diskStates[j].info,
            percent: response.data.diskStates[j].percent,
            total: total,
            useable: usable,
            usableStorageSet: usableStorageSet,
            totalStorageSet: totalStorageSet
          };
          this.hostDiskStateList.push(disk);
        }
      })
      .catch(error => {});
  }
  @action
  public async getHostResourceReportCheck(ip: string) {
    await this.getHostResourceCheckReportInfo(ip);
  }

  //Host backup Report
  @action
  getHostBackUpInfo(ip: string) {
    return Axios.get("http://192.168.0.68:8765/v1/host-status/backup/" + ip, {})
      .then(response => {
        this.hostBackUpList = [];
        let getbackup;

        let ipInfo = response.data.ip;
        for (let j = 0; j < response.data.path.length; j++) {
          let fileName = response.data.path[j].name;
          for (let k = 0; k < response.data.path[j].fileInfo.length; k++) {
            let storageSet = "byte";
            this.backUpSizeStorage = 0;
            let fileTemp = response.data.path[j].fileInfo[k].size;
            let fileSize = parseInt(this.getSize(fileTemp).toFixed(0));
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
            let tempDate = response.data.path[j].fileInfo[k].date.split("T");
            let date = tempDate[0];
            let tempTime = tempDate[1].split(".");
            let time = tempTime[0];
            let resultDate = date + " " + time;
            getbackup = {
              ip: ipInfo,
              folderName: fileName,
              name: response.data.path[j].fileInfo[k].name,
              date: resultDate,
              size: fileSize,
              type: response.data.path[j].fileInfo[k].type,
              storage: storageSet
            };
            this.hostBackUpList.push(getbackup);
          }
        }
      })
      .catch(error => {});
  }

  @action
  public async getHostBackUp(ip: string) {
    await this.getHostBackUpInfo(ip);
  }

  //host aliveCheckOnOFF
  @action
  setHostAliveCheckOnOffInfo(ip: string, index: number) {
    return Axios.put(
      "http://192.168.0.68:8765/v1/hosts/" +
        ip +
        "/monitoringStatus?monitoringStatus=" +
        this.serverList[index].monitoringStatus,
      {}
    )
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async setHostAliveCheckOnOff(ip: string, index: number) {
    await this.setHostAliveCheckOnOffInfo(ip, index);
  }
  //host aliveChecktime
  @action
  setHostAliveCheckOnOffTimeInfo(ip: string, index: number) {
    return Axios.put(
      "http://192.168.0.68:8765/v1/hosts/" +
        ip +
        "/monitoringIgnoreTime?monitoringIgnoreTime=" +
        this.serverList[index].hostAliveCheckStartTime +
        "-" +
        this.serverList[index].hostAliveCheckStopTime,
      {}
    )
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async setHostAliveCheckOnOffTime(ip: string, index: number) {
    await this.setHostAliveCheckOnOffTimeInfo(ip, index);
  }

  //host aliveChecktime
  @action
  delHostAliveCheckOnOffTimeInfo(ip: string, index: number) {
    return Axios.delete(
      "http://192.168.0.68:8765/v1/hosts/" + ip + "/monitoringIgnoreTime"
    )
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async delHostAliveCheckOnOffTime(ip: string, index: number) {
    await this.delHostAliveCheckOnOffTimeInfo(ip, index);
  }

  getStorageUnit(size: number): SizeAndUnit {
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
  getSize(size: number): number {
    if (size < 1024) {
      return size;
    } else {
      this.backUpSizeStorage++;
      return this.getSize(size / 1024);
    }
  }
}
