import { observable, action } from "mobx";
import Axios from "axios";

export interface Receiver {
  name: string;
  type: string;
  mail: string;
}
export interface emailSend {
  onOff: string;
  reportTime?: string;
}
export interface Sender {
  name: string;
  smtpHost: string;
  smtpPort: number;
  mail: string;
  pwd?: any;
}
export class email {
  @observable public emailOnOff = "off";
  @observable public emailReservationOnOff = "off";
  @observable public editOnOff = false;
  @observable public emailHour = "";
  @observable public emailMin = "";
  @observable public emailTime: emailSend = {
    onOff: "loading",
    reportTime: "loading...."
  };
  @observable public receiverName = "";
  @observable public receiverEmail = "";
  @observable public receiveType = "";
  @observable public receiverList: Array<Receiver> = [];
  @observable public senderInfo: Sender = {
    name: "",
    smtpHost: "",
    smtpPort: 0,
    mail: ""
  };

  //Email에 관련한 항목

  //sender수정
  @action
  addSenderInfo() {
    return Axios.put("http://192.168.0.68:8765/v1/mail/sender", {
      mail: this.senderInfo.mail,
      name: this.senderInfo.name,
      pwd: this.senderInfo.pwd,
      smtpHost: this.senderInfo.smtpHost,
      smtpPort: this.senderInfo.smtpPort
    })
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async addSender() {
    await this.addSenderInfo();
  }

  //email on off
  @action settingEmailOnOff() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/mail/onOff?onOff=" + this.emailOnOff
    )
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async setEmailOnOff() {
    await this.settingEmailOnOff();
  }
  //email파트 기본정보 가져오기(이메일 보고서 제외)
  @action
  getMailInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/mail", {})
      .then(response => {
        this.receiverList = [];
        this.receiverList = response.data.receivers;
        this.senderInfo = response.data.sender;
        this.emailOnOff = response.data.onOff;
        if (this.receiverList === null) {
          this.receiverList = [];
        }
      })
      .catch(error => {});
  }
  @action
  public async getMail() {
    await this.getMailInfo();
  }
  //mail로 보고서를 보낼지말지 그부분 onoff
  @action settingEmailReportOnOff() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/mail-report/config/onOff?onOff=" +
        this.emailTime.onOff
    )
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async setEmailReportOnOff() {
    await this.settingEmailReportOnOff();
  }

  //수신자 추가
  @action
  addReceiverInfo(receiver: Receiver) {
    return Axios.post(
      "http://192.168.0.68:8765/v1/mail/receivers/" + receiver.mail,
      {
        mail: receiver.mail,
        name: receiver.name,
        type: receiver.type
      }
    )
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async addReceiver(receiver: Receiver) {
    await this.addReceiverInfo(receiver);
  }

  //수신자 하나 삭제
  @action
  deleteReceiverInfo(mail: string) {
    return Axios.delete("http://192.168.0.68:8765/v1/mail/receivers/" + mail)
      .then(response => {})
      .catch(error => {});
  }
  @action
  public async deleteReceiver(mail: string) {
    await this.deleteReceiverInfo(mail);
  }

  //수신자 전체 삭제
  @action
  deleteReceiverAllInfo() {
    return Axios.delete("http://192.168.0.68:8765/v1/mail/receivers")
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async deleteReceiverAll() {
    await this.deleteReceiverAllInfo();
  }

  //Email 예약보고 onoff
  getEmailReportOnOffInfo() {
    return Axios.get("http://192.168.0.68:8765/v1/mail-report/config/onOff")
      .then(response => {
        this.emailTime.onOff = response.data;
        if (this.emailTime.onOff === "on") {
          this.getEmailReportTime();
        }
      })
      .catch(error => {});
  }
  @action
  public async getEmailReportOnOff() {
    await this.getEmailReportOnOffInfo();
  }

  //Email 예약보고 time
  getEmailReportTimeInfo() {
    return Axios.get(
      "http://192.168.0.68:8765/v1/mail-report/config/reportTime"
    )
      .then(response => {
        this.emailTime.reportTime = response.data;
      })
      .catch(error => {});
  }
  @action
  public async getEmailReportTime() {
    await this.getEmailReportTimeInfo();
  }

  //email보고서(Setting) 시간설정
  @action settingEmailReportTime() {
    return Axios.put(
      "http://192.168.0.68:8765/v1/mail-report/config/reportTime?reportTime=" +
        this.emailTime.reportTime
    )
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async setEmailReportTime() {
    await this.settingEmailReportTime();
  }

  //email보고서즉시보내기
  @action settingEmailReportNow() {
    return Axios.put("http://192.168.0.68:8765/v1/mail-report/now")
      .then(response => {})
      .catch(error => {});
  }

  @action
  public async setEmailReportNow() {
    await this.settingEmailReportNow();
  }
}
