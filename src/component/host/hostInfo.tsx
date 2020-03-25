import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Table } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import TimeSetting from "./hostAliveCheckTimeSetting";
import AliveCheckReport from "./hostAliveCheckReport";
import ResourceCheckReport from "./hostResourceCheckReport";
import BackUpCheckReport from "./hostBackUpCheckReport";
import { hostContext } from "../../context/hostContext";
import { HostPointer, HostAliveOnText } from "./styled";

const hostInfo = observer(() => {
  const navBar = useContext(navBarContext);
  const hostInfo = useContext(hostContext);
  const hostAliveCheckMode = () => {
    if (hostInfo.serverList[hostInfo.hostListNum].monitoringStatus === "off") {
      hostInfo.serverList[hostInfo.hostListNum].monitoringStatus = "on";
    } else {
      hostInfo.serverList[hostInfo.hostListNum].monitoringStatus = "off";
    }
    hostInfo.setHostAliveCheckOnOff(
      hostInfo.serverList[hostInfo.hostListNum].ip,
      hostInfo.hostListNum
    );
  };
  const hostAliveCheckTimeMode = () => {
    if (
      hostInfo.serverList[hostInfo.hostListNum].hostAliveCheckTimeOnOff ===
      "off"
    ) {
      hostInfo.serverList[hostInfo.hostListNum].hostAliveCheckTimeOnOff = "on";
    } else {
      hostInfo.serverList[hostInfo.hostListNum].hostAliveCheckTimeOnOff = "off";
    }
    hostInfo.delHostAliveCheckOnOffTime(
      hostInfo.serverList[hostInfo.hostListNum].ip,
      hostInfo.hostListNum
    );
    hostInfo.serverList[hostInfo.hostListNum].hostAliveCheckStartTime = "";
    hostInfo.serverList[hostInfo.hostListNum].hostAliveCheckStopTime = "";
  };

  const hostAliveCheckReportShow = () => {
    navBar.hostAliveCheckReport = !navBar.hostAliveCheckReport;
    if (hostInfo.hostAliveList.ip === "") {
      hostInfo.getHostAliveCheck(hostInfo.serverList[hostInfo.hostListNum].ip);
    }
  };
  const hostResourceCheckReportShow = () => {
    navBar.hostResourceCheckReport = !navBar.hostResourceCheckReport;
    if (
      hostInfo.hostDiskStateList.length === 0 &&
      hostInfo.hostMemoryStateList.length === 0
    )
      hostInfo.getHostResourceReportCheck(
        hostInfo.serverList[hostInfo.hostListNum].ip
      );
  };

  const hostBackUpCheckReportShow = () => {
    navBar.hostBackUpCheckReport = !navBar.hostBackUpCheckReport;
    if (hostInfo.hostBackUpList.length === 0) {
      hostInfo.getHostBackUp(hostInfo.serverList[hostInfo.hostListNum].ip);
    }
  };

  return (
    <div>
      <Table bordered>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{hostInfo.serverList[hostInfo.hostListNum].ip}</td>
          </tr>
          <tr>
            <td>⁠name</td>
            <td>{hostInfo.serverList[hostInfo.hostListNum].name}</td>
          </tr>
          <tr>
            <td>⁠Mode</td>
            <td>{hostInfo.serverList[hostInfo.hostListNum].mode}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              {" "}
              <HostAliveOnText> Alive Check 모니터링</HostAliveOnText>
              <span>
                <Button onClick={hostAliveCheckMode} outline color="secondary">
                  {hostInfo.serverList[hostInfo.hostListNum].monitoringStatus}
                </Button>
              </span>
              {hostInfo.serverList[hostInfo.hostListNum].monitoringStatus ===
              "on" ? (
                <div>
                  <div>(off 하면 하루종일 Alive Check를 합니다)</div>
                  <HostAliveOnText>
                    ⁠Alive Check 모니터링 정지 시간설정
                  </HostAliveOnText>
                  <span>
                    <Button
                      onClick={hostAliveCheckTimeMode}
                      outline
                      color="secondary"
                    >
                      {
                        hostInfo.serverList[hostInfo.hostListNum]
                          .hostAliveCheckTimeOnOff
                      }
                    </Button>
                  </span>
                  {hostInfo.serverList[hostInfo.hostListNum]
                    .hostAliveCheckTimeOnOff === "on" ? (
                    <div>
                      <TimeSetting />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div>
                    ⁠Alive Check 보고서
                    {!navBar.hostAliveCheckReport ? (
                      <HostPointer onClick={hostAliveCheckReportShow}>
                        ▽
                      </HostPointer>
                    ) : (
                      <HostPointer onClick={hostAliveCheckReportShow}>
                        △
                      </HostPointer>
                    )}
                  </div>
                  {navBar.hostAliveCheckReport ? (
                    <div>
                      <AliveCheckReport />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              ⁠⁠Resource Check보고서
              {!navBar.hostResourceCheckReport ? (
                <HostPointer onClick={hostResourceCheckReportShow}>
                  ▽
                </HostPointer>
              ) : (
                <HostPointer onClick={hostResourceCheckReportShow}>
                  △
                </HostPointer>
              )}
              {navBar.hostResourceCheckReport ? (
                <div>
                  <ResourceCheckReport />
                </div>
              ) : (
                <div></div>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              ⁠⁠Backup Check보고서
              {!navBar.hostBackUpCheckReport ? (
                <HostPointer onClick={hostBackUpCheckReportShow}>▽</HostPointer>
              ) : (
                <HostPointer onClick={hostBackUpCheckReportShow}>△</HostPointer>
              )}
              {navBar.hostBackUpCheckReport ? (
                <div>
                  <BackUpCheckReport />
                </div>
              ) : (
                <div></div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default hostInfo;
