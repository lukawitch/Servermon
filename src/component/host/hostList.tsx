import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import { Button } from "reactstrap";
import { ServerList } from "../../model/host";
import { hostContext } from "../../context/hostContext";
import { HostInfoShow } from "./styled";

const hostList = observer(
  ({ hostList, index }: { hostList: ServerList; index: number }) => {
    const navBar = useContext(navBarContext);
    const hostInfo = useContext(hostContext);
    const hostInfoShow = (index: number) => {
      hostInfo.hostAliveList = {
        ip: "",
        name: "",
        status: ""
      };
      hostInfo.hostDiskStateList = [];
      hostInfo.hostMemoryStateList = [];
      hostInfo.hostBackUpList = [];
      navBar.hostBackUpCheckReport = false;
      navBar.hostResourceCheckReport = false;
      navBar.hostAliveCheckReport = false;
      navBar.hostDiskCheckReport = false;
      navBar.hostMemoryCheckReport = false;

      if (
        (hostInfo.hostListNum === index && navBar.hostInfoShow === true) ||
        navBar.hostInfoShow === false
      ) {
        navBar.hostInfoShow = !navBar.hostInfoShow;
      }

      hostInfo.hostListNum = index;
      if (hostInfo.serverList[index].hostAliveCheckStartTime === "") {
      } else {
        let start: string[];
        let stop: string[];
        start = hostInfo.serverList[index].hostAliveCheckStartTime.split(":");
        stop = hostInfo.serverList[index].hostAliveCheckStopTime.split(":");
        hostInfo.aliveCheckStartHour = start[0];
        hostInfo.aliveCheckStartMin = start[1];
        hostInfo.aliveCheckStopHour = stop[0];
        hostInfo.aliveCheckStopMin = stop[1];
      }
    };

    const deleteReceiver = (index: number) => {
      hostInfo.deleteHost(hostInfo.serverList[index].ip);
      hostInfo.serverList.splice(index, 1);
    };

    return (
      <tr>
        <HostInfoShow
          onClick={() => {
            hostInfoShow(index);
          }}
        >
          {hostList.ip}
        </HostInfoShow>
        <td>{hostList.name}</td>
        <td>{hostList.mode}</td>
        <td>
          {" "}
          <Button
            close
            onClick={() => {
              deleteReceiver(index);
            }}
          />
        </td>
      </tr>
    );
  }
);

export default hostList;
