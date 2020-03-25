import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container, Spinner } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import AliveCheck from "./reportAliveCheck";
import ResourceCheck from "./reportResourceCheck";
import FileInfo from "./reportFileInfo";
import { reportContext } from "../../context/reportContext";
import {
  ReportPageLogo,
  ReportPageDescription,
  ReportPointer,
  ReportMenuPosition,
  ReportNoItem,
  ReportLoadingIcon
} from "./styled";

const report = observer(() => {
  const navBar = useContext(navBarContext);
  const report = useContext(reportContext);

  const aliveCheckShow = () => {
    navBar.reportAliveCheck = !navBar.reportAliveCheck;
    if (report.aliveList.length === 0) {
      report.getAliveCheck();
    }
  };
  const resourceCheckShow = () => {
    navBar.reportResourceCheck = !navBar.reportResourceCheck;
    if (
      report.memoryStateList.length === 0 &&
      report.diskStateList.length === 0
    ) {
      report.getResourceCheck();
    }
  };
  const fileInfoShow = () => {
    navBar.reportFileInfo = !navBar.reportFileInfo;
    if (report.backUpList.length === 0) {
      report.getBackUp();
    }
  };

  return (
    <ReportMenuPosition>
      <Container>
        <ReportPageLogo className="display-4">Report</ReportPageLogo>
        <ReportMenuPosition>
          <ReportPageDescription>
            ⁠Alive Check{" "}
            {navBar.reportAliveCheck === false ? (
              <ReportPointer onClick={aliveCheckShow}>▽</ReportPointer>
            ) : (
              <ReportPointer onClick={aliveCheckShow}>△</ReportPointer>
            )}
          </ReportPageDescription>
        </ReportMenuPosition>
        {navBar.reportAliveCheck ? (
          <div>
            {report.aliveNot ? (
              <>
                <ReportNoItem>기록이 없습니다.</ReportNoItem>
              </>
            ) : (
              <>
                {!report.aliveLoadingComplete ? (
                  <ReportLoadingIcon>
                    <Spinner color="info" />
                  </ReportLoadingIcon>
                ) : (
                  <AliveCheck />
                )}
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <ReportMenuPosition>
          <ReportPageDescription>
            ⁠Resource Check{" "}
            {navBar.reportResourceCheck === false ? (
              <ReportPointer onClick={resourceCheckShow}>▽</ReportPointer>
            ) : (
              <ReportPointer onClick={resourceCheckShow}>△</ReportPointer>
            )}
          </ReportPageDescription>
        </ReportMenuPosition>
        {navBar.reportResourceCheck ? (
          <div>
            {report.resourceNot ? (
              <>
                <ReportNoItem>기록이 없습니다.</ReportNoItem>
              </>
            ) : (
              <>
                {!report.resourceLoadingComplete ? (
                  <ReportLoadingIcon>
                    <Spinner color="info" />
                  </ReportLoadingIcon>
                ) : (
                  <ResourceCheck />
                )}
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <ReportMenuPosition>
          <ReportPageDescription>
            ⁠FileInfo
            {navBar.reportFileInfo === false ? (
              <ReportPointer onClick={fileInfoShow}>▽</ReportPointer>
            ) : (
              <ReportPointer onClick={fileInfoShow}>△</ReportPointer>
            )}
          </ReportPageDescription>
        </ReportMenuPosition>
        {navBar.reportFileInfo ? (
          <div>
            {report.fileInfoNot ? (
              <>
                <ReportNoItem>기록이 없습니다.</ReportNoItem>
              </>
            ) : (
              <>
                {!report.backUpLoadingComplete ? (
                  <ReportLoadingIcon>
                    <Spinner color="info" />
                  </ReportLoadingIcon>
                ) : (
                  <FileInfo />
                )}
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </ReportMenuPosition>
  );
});

export default report;
