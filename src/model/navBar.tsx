import { observable } from "mobx";

export class navBar {
  @observable public hostListNum = 1;
  @observable public onClickServer = false;
  @observable public submenuCheck = 0;

  @observable public emailNavBar = 1;
  @observable public receiverAddOrNot = false;
  @observable public reservationCheck = "off";
  @observable public reservationTimeEdit = false;

  @observable public hostSettingNavBar = 1;
  @observable public hostInfoShow = false;

  @observable public hostAliveCheck = "off";
  @observable public hostAliveCheckTime: any = "off";
  @observable public hostAliveCheckReport = false;
  @observable public hostResourceCheckReport = false;
  @observable public hostDiskCheckReport = false;
  @observable public hostMemoryCheckReport = false;
  @observable public hostBackUpCheckReport = false;
  @observable public hostFileCheckReport = false;
  @observable public hostReportSend = "off";

  @observable public pingAliveCheck = "off";
  @observable public pingAliveCheckEdit = false;

  @observable public reportAliveCheck = false;
  @observable public reportResourceCheck = false;
  @observable public reportDiskCheck = false;
  @observable public reportMemoryCheck = false;
  @observable public reportFileInfo = false;

  @observable public settingAliveCheck = false;
  @observable public settingResourceCheck = false;
  @observable public settingDiskCheck = false;
  @observable public settingMemoryCheck = false;
  @observable public settingFileInfo = false;

  @observable public issueDiskCheck = false;
  @observable public issueMemoryCheck = false;

  @observable public topNavBarNumber = 0;
}
