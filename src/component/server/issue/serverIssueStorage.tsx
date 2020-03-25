import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Table } from "reactstrap";
import { hostContext } from "../../../context/hostContext";
import { serverContext } from "../../../context/serverContext";

const serverIssueStorage = observer(() => {
  const host = useContext(hostContext);
  const server = useContext(serverContext);
  const [nowStorage, setNowStorage] = useState(server.storageNowCollect);

  useEffect(() => {
    for (let i = 0; i < host.storageDiskName.length; i++) {
      server.getstoragePercent(
        host.serverList[host.serverListNum].ip,
        host.storageDiskName[i]
      );
    }

    const interval = setInterval(() => {
      for (let i = 0; i < host.storageDiskName.length; i++) {
        let tempValue;

        server.getstoragePercent(
          host.serverList[host.serverListNum].ip,
          host.storageDiskName[i]
        );
        tempValue = server.storageNowInfo;

        if (server.storageNowCollect[i] === undefined) {
          server.storageNowCollect.push(tempValue);
        } else {
          server.storageNowCollect[i] = tempValue;
        }

        server.storageNowCollect = server.storageNowCollect.slice();
        setNowStorage(server.storageNowCollect);
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>장치이름</th>
            <th>사용량</th>
          </tr>
        </thead>
        <tbody>
          {nowStorage[0] > 100 ? (
            <>
              {host.hostDiskStateList.map((list, index) => (
                <tr key={index}>
                  <th scope="row">{host.storageDiskName[index]}</th>
                  <td>
                    {list.percent >= 80 ? (
                      <Alert color="danger">{list.percent} %</Alert>
                    ) : (
                      <Alert color="primary">{list.percent} %</Alert>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {nowStorage.map((list, index) => (
                <tr key={index}>
                  <th scope="row">{host.storageDiskName[index]}</th>
                  <td>
                    {list >= 80 ? (
                      <Alert color="danger">{list} %</Alert>
                    ) : (
                      <Alert color="primary">{list} %</Alert>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
});

export default serverIssueStorage;
