import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import {
  ServerNavBarItem,
  ServerHostItem,
  ServerHostItemIP,
  ServerSummaryPageDescription,
  ServerSummaryPagePosition,
  ServerHostSummaryText
} from "./styled";
import { serverContext } from "../../../context/serverContext";
import { navBarContext } from "../../../context/navBarContext";
import { Redirect } from "react-router";
import MemoryTotal from "./serverHostSummaryMemory";
import StorageTotal from "./serverHotSummaryStorage";

const serverHostSummary = observer(() => {
  const host = useContext(hostContext);
  const server = useContext(serverContext);
  const navBar = useContext(navBarContext);
  useEffect(() => {
    if (host.serverList.length !== 0) {
      navBar.submenuCheck = 1;
      server.memoryData = [];
      server.timeData = [];
      server.storageTimeData = [];
      host.storageDiskName = [];
      server.storageNowCollect = [server.storageNowInfo];
      server.storageDiskTotal.splice(0, server.storageDiskTotal.length);
      host.getHostResourceCheck(host.serverList[host.serverListNum].ip);
      host.hostDiskNameList = host.hostDiskNameList.slice();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {host.serverList[host.serverListNum] === undefined ? (
        <>
          <Redirect to="/serverlist" />
        </>
      ) : (
        <>
          <Container>
            <ServerHostItemIP>
              <ServerHostSummaryText> ip:</ServerHostSummaryText>
              {host.serverList[host.serverListNum].ip}
            </ServerHostItemIP>
            <ServerNavBarItem>
              <ServerHostItem>
                <ServerHostSummaryText> name:</ServerHostSummaryText>
                {host.serverList[host.serverListNum].name}
              </ServerHostItem>
              <ServerHostItem>
                <ServerHostSummaryText> Mode:</ServerHostSummaryText>
                {host.serverList[host.serverListNum].mode}
              </ServerHostItem>
              <ServerHostItem>
                <ServerHostSummaryText> alive:</ServerHostSummaryText>
                {host.serverList[host.serverListNum].monitoringStatus}
              </ServerHostItem>
            </ServerNavBarItem>
            <hr />
          </Container>
          <div>
            {server.memoryPercent[host.serverListNum] > 100 ? (
              <>
                <Redirect to="/serverlist" />
              </>
            ) : (
              <>
                <Container>
                  <ServerSummaryPagePosition>
                    <Row>
                      <Col sm="6">
                        <ServerSummaryPageDescription>
                          Memory
                        </ServerSummaryPageDescription>
                        {server.memoryPercent[host.serverListNum] > 80 ? (
                          <>
                            <MemoryTotal colorNow={["#fe4365", "#dddddd"]} />
                          </>
                        ) : (
                          <>
                            <MemoryTotal colorNow={["#67D5B5", "#dddddd"]} />
                          </>
                        )}
                      </Col>
                      <Col sm="6">
                        <ServerSummaryPageDescription>
                          Storage
                        </ServerSummaryPageDescription>
                        {server.storagePercent[host.serverListNum] > 80 ? (
                          <>
                            <StorageTotal colorNow={["#fe4365", "#dddddd"]} />
                          </>
                        ) : (
                          <>
                            <StorageTotal colorNow={["#67D5B5", "#dddddd"]} />
                          </>
                        )}
                      </Col>
                    </Row>
                  </ServerSummaryPagePosition>
                </Container>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default serverHostSummary;
