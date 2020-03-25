import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import { hostContext } from "../../context/hostContext";
import DiskInfo from "./HostDiskCheckData";

const hostDiskCheckReport = observer(() => {
  const diskList = useContext(hostContext);
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Host</th>
            <th>info</th>
            <th>total</th>
            <th>usable</th>
            <th>percent</th>
          </tr>
        </thead>
        <tbody>
          {diskList.hostDiskStateList.map((list, index) => (
            <DiskInfo DiskList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default hostDiskCheckReport;
