import React, { useContext } from "react";
import { Table } from "reactstrap";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../context/hostContext";
import MemoryReport from "./hostMemoryCheckData";

const hostMemoryCheckReport = observer(() => {
  const memoryList = useContext(hostContext);
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>host</th>
            <th>info</th>
            <th>total</th>
            <th>usable</th>
            <th>percent</th>
          </tr>
        </thead>
        <tbody>
          {memoryList.hostMemoryStateList.map((list, index) => (
            <MemoryReport memoryList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default hostMemoryCheckReport;
