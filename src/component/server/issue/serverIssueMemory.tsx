import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Alert, Table } from "reactstrap";
import { hostContext } from "../../../context/hostContext";
import { serverContext } from "../../../context/serverContext";

const serverIssueMemory = observer(() => {
  const host = useContext(hostContext);
  const memory = useContext(serverContext);
  const [nowMemory, setNowMemory] = useState(memory.memoryNowInfo);

  useEffect(() => {
    memory.getMemoryPercent(host.serverList[host.serverListNum].ip);
    const interval = setInterval(() => {
      memory.getMemoryPercent(host.serverList[host.serverListNum].ip);
      const tempValue = memory.memoryNowInfo;
      setNowMemory(tempValue);
    }, 10 * 1000);
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
          {nowMemory > 100 ? (
            <tr>
              <th scope="row">Memory</th>
              <td>
                {host.hostMemoryStateList[0].percent >= 80 ? (
                  <Alert color="danger">
                    {host.hostMemoryStateList[0].percent} %
                  </Alert>
                ) : (
                  <Alert color="primary">
                    {host.hostMemoryStateList[0].percent} %
                  </Alert>
                )}
              </td>
            </tr>
          ) : (
            <tr>
              <th scope="row">Memory</th>
              <td>
                {nowMemory >= 80 ? (
                  <Alert color="danger">{nowMemory} %</Alert>
                ) : (
                  <Alert color="primary">{nowMemory} %</Alert>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
});

export default serverIssueMemory;
