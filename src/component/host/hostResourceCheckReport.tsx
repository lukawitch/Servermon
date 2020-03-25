import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import DiskReport from "./hostDiskCheckReport";
import MemoryReport from "./hostMemoryCheckReport";
import { HostPointer } from "./styled";

const hostResourceCheckReport = observer(() => {
  const navBar = useContext(navBarContext);

  const hostDiskCheckReportShow = () => {
    navBar.hostDiskCheckReport = !navBar.hostDiskCheckReport;
  };
  const hostMemoryCheckReportShow = () => {
    navBar.hostMemoryCheckReport = !navBar.hostMemoryCheckReport;
  };

  return (
    <div>
      ⁠⁠Disk Check보고서
      {!navBar.hostDiskCheckReport ? (
        <HostPointer onClick={hostDiskCheckReportShow}>▽</HostPointer>
      ) : (
        <HostPointer onClick={hostDiskCheckReportShow}>△</HostPointer>
      )}
      {navBar.hostDiskCheckReport ? (
        <div>
          <DiskReport />
        </div>
      ) : (
        <div></div>
      )}
      ⁠⁠ Memory Check보고서
      {!navBar.hostMemoryCheckReport ? (
        <HostPointer onClick={hostMemoryCheckReportShow}>▽</HostPointer>
      ) : (
        <HostPointer onClick={hostMemoryCheckReportShow}>△</HostPointer>
      )}
      {navBar.hostMemoryCheckReport ? (
        <div>
          <MemoryReport />
        </div>
      ) : (
        <div></div>
      )}
      ⁠⁠
    </div>
  );
});

export default hostResourceCheckReport;
