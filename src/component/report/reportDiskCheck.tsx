import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import DiskInfo from "./reportDiskCheckData";
import { reportContext } from "../../context/reportContext";

const reportDiskCheck = observer(() => {
  const diskList = useContext(reportContext);
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
          {diskList.diskStateList.map((list, index) => (
            <DiskInfo DiskList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default reportDiskCheck;
