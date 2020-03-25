import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import DiskCheck from "./reportDiskCheck";
import MemoryCheck from "./reportMemoryCheck";
import { ReportPointer, ReportPageSubDescription } from "./styled";

const reportResourceCheck = observer(() => {
  const navBar = useContext(navBarContext);

  const reportDiskCheckReportShow = () => {
    navBar.reportDiskCheck = !navBar.reportDiskCheck;
  };
  const reportMemoryCheckReportShow = () => {
    navBar.reportMemoryCheck = !navBar.reportMemoryCheck;
  };

  return (
    <div>
      <ReportPageSubDescription>
        Disk Check보고서
        {!navBar.reportDiskCheck ? (
          <ReportPointer onClick={reportDiskCheckReportShow}>▽</ReportPointer>
        ) : (
          <ReportPointer onClick={reportDiskCheckReportShow}>△</ReportPointer>
        )}
      </ReportPageSubDescription>{" "}
      ⁠⁠
      {navBar.reportDiskCheck ? (
        <div>
          <DiskCheck />
        </div>
      ) : (
        <div></div>
      )}
      ⁠⁠
      <ReportPageSubDescription>
        Memory Check보고서
        {!navBar.reportMemoryCheck ? (
          <ReportPointer onClick={reportMemoryCheckReportShow}>▽</ReportPointer>
        ) : (
          <ReportPointer onClick={reportMemoryCheckReportShow}>△</ReportPointer>
        )}
      </ReportPageSubDescription>
      {navBar.reportMemoryCheck ? (
        <div>
          <MemoryCheck />
        </div>
      ) : (
        <div></div>
      )}
      ⁠⁠
    </div>
  );
});

export default reportResourceCheck;
