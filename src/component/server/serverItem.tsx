import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import styled from "styled-components";
import { ServerList } from "../../model/host";
import { hostContext } from "../../context/hostContext";
import { serverContext } from "../../context/serverContext";
import { ServerItemLinkText } from "./styled";

const serverItem = observer(
  ({
    serverList,
    index,
    memory,
    storage
  }: {
    serverList: ServerList;
    index: number;
    memory: number;
    storage: number;
  }) => {
    const navBar = useContext(navBarContext);
    const hostinfo = useContext(hostContext);
    const server = useContext(serverContext);
    const ServerItemClickStyle = styled.tr`
      background-color: ${navBar.onClickServer &&
      hostinfo.serverListNum === index
        ? "#ddd"
        : "white"};
      color: black;
    `;
    const changeState = (index: number) => {
      if (
        (hostinfo.serverListNum === index && navBar.onClickServer === true) ||
        navBar.onClickServer === false
      ) {
        navBar.onClickServer = !navBar.onClickServer;
      }
      if (navBar.onClickServer === true) {
        navBar.submenuCheck = 1;
        server.storageNowInfo = 888;
        server.memoryNowInfo = 888;
        hostinfo.serverListNum = index;
      }
    };

    return (
      <ServerItemClickStyle>
        <td>
          <ServerItemLinkText
            to="/serversummary"
            onClick={() => {
              changeState(index);
            }}
          >
            {serverList.name}
          </ServerItemLinkText>
        </td>

        <td>{serverList.ip}</td>
        <td>{serverList.monitoringStatus}</td>
        <td>{serverList.mode}</td>
        {memory > 100 ? <td></td> : <td>{memory} %</td>}
        {storage > 100 ? <td></td> : <td>{storage} %</td>}
      </ServerItemClickStyle>
    );
  }
);

export default serverItem;
