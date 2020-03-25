import { observable, action } from "mobx";
import Axios from "axios";

export interface PingSetting {
  interval: any;
  timeout: any;
  onOff: string;
}

export class ping {
  @observable public ping: PingSetting = {
    interval: 0,
    timeout: 0,
    onOff: ""
  };

  //Ping
  //ping alive onOff
  @action settingPingOnOff() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/ping/onOff?onOff=" + this.ping.onOff
    )
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async setPingOnOff() {
    await this.settingPingOnOff();
  }
  //ping alive값 setting
  @action settingPingInterval() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/ping/interval?interval=" + this.ping.interval
    )
      .then(response => {
        this.settingPingTimeOut();
      })
      .catch(error => {});
  }

  @action settingPingTimeOut() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/ping/timeout?timeout=" + this.ping.timeout
    )
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async setPingValue() {
    await this.settingPingInterval();
  }
  //ping 지금 설정되어있는 정보 가져오기
  @action
  getPingInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/ping", {})
      .then(response => {
        this.ping = response.data;
      })
      .catch(error => {});
  }
  @action
  public async getPing() {
    await this.getPingInfo();
  }

  //ping 기본설정 가져오기
  @action
  getPingDefaultInfo() {
    return Axios.put("http://192.168.0.68:8765/v1/ping/default-setting")
      .then(response => {
        this.getPing();
      })
      .catch(error => {});
  }
  @action
  public async getPingDefault() {
    await this.getPingDefaultInfo();
  }
}
