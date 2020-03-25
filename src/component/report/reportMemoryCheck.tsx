import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import MemoryReport from "./reportMemoryCheckData";
import { reportContext } from "../../context/reportContext";

const reportMemoryCheck = observer(() => {
  const memoryList = useContext(reportContext);
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>host</th>
            <th>total</th>
            <th>usable</th>
            <th>percent</th>
          </tr>
        </thead>
        <tbody>
          {memoryList.memoryStateList.map((list, index) => (
            <MemoryReport memoryList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default reportMemoryCheck;
