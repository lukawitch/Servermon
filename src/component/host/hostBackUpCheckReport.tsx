import React, { useContext } from "react";
import { navBarContext } from "../../context/navBarContext";
import { observer } from "mobx-react-lite";
import FileInfo from "./hostFileInfoReport";
import { HostPointer } from "./styled";

const hostBackUpCheckReport = observer(() => {
  const navBar = useContext(navBarContext);

  const hostFileCheckReportShow = () => {
    navBar.hostFileCheckReport = !navBar.hostFileCheckReport;
  };

  return (
    <div>
      ⁠⁠FileInfo보고서
      {!navBar.hostFileCheckReport ? (
        <HostPointer onClick={hostFileCheckReportShow}>▽</HostPointer>
      ) : (
        <HostPointer onClick={hostFileCheckReportShow}>△</HostPointer>
      )}
      {navBar.hostFileCheckReport ? (
        <div>
          <FileInfo />
        </div>
      ) : (
        <div></div>
      )}
      ⁠⁠
    </div>
  );
});

export default hostBackUpCheckReport;
