import React, { useContext, useEffect } from "react";
import { Container, Table, Spinner } from "reactstrap";
import { observer } from "mobx-react-lite";
import ServerItem from "./serverItem";
import { hostContext } from "../../context/hostContext";
import { serverContext } from "../../context/serverContext";
import {
  ServerListPageLogo,
  ServerLoadingIcon,
  ServerListPosition
} from "./styled";

const serverList = observer(() => {
  const host = useContext(hostContext);
  const server = useContext(serverContext);

  useEffect(() => {
    const interval = setInterval(() => {
      server.getTotalMemoryPercent(host.serverList);
    }, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {host.objectHaveOrNot ? (
        <>
          <Container>서버가 존재하지 않습니다.</Container>
        </>
      ) : (
        <>
          {!host.serverLoadingComplete ||
          !server.serverMemoryInfoLoading ||
          !server.serverStorageInfoLoading ? (
            <>
              <Container>
                <ServerLoadingIcon>
                  <Spinner color="info" />
                </ServerLoadingIcon>
              </Container>
            </>
          ) : (
            <>
              <Container>
                <ServerListPosition>
                  <ServerListPageLogo className="display-4">
                    ServerList
                  </ServerListPageLogo>
                  <ServerListPosition>
                    <Table>
                      <thead>
                        <tr>
                          <th>name</th>
                          <th>IP</th>
                          <th>monitoring</th>
                          <th>mode</th>
                          <th>memory</th>
                          <th>Storage</th>
                        </tr>
                      </thead>

                      <tbody>
                        {server.memoryPercent.length === 0 ? (
                          <></>
                        ) : (
                          <React.Fragment>
                            {host.serverList.map((list, index) => (
                              <ServerItem
                                serverList={list}
                                index={index}
                                memory={server.memoryPercent[index]}
                                storage={server.storagePercent[index]}
                                key={index}
                              />
                            ))}
                          </React.Fragment>
                        )}
                      </tbody>
                    </Table>
                  </ServerListPosition>
                </ServerListPosition>
              </Container>
            </>
          )}
        </>
      )}
    </div>
  );
});

export default serverList;
