import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import { pingContext } from "../../context/pingContext";

const pingInfo = observer(() => {
  const ping = useContext(pingContext);
  return (
    <div>
      <Table bordered>
        <tbody>
          <tr>
            <td>⁠Interval</td>
            <td>{ping.ping.interval}</td>
          </tr>
          <tr>
            <td>TimeOut</td>
            <td>{ping.ping.timeout}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default pingInfo;
