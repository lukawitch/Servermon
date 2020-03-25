import React, { useContext } from "react";
import { Table } from "reactstrap";
import { observer } from "mobx-react-lite";
import AliveData from "./hostAliveCheckData";
import { hostContext } from "../../context/hostContext";

const hostAliveCheckReport = observer(() => {
  const aliveListData = useContext(hostContext);
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>IP</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <AliveData AliveList={aliveListData.hostAliveList} index={0} />
        </tbody>
      </Table>
    </div>
  );
});

export default hostAliveCheckReport;
