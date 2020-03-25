import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import AliveData from "./reportAliveCheckData";
import { reportContext } from "../../context/reportContext";

const reportAliveCheck = observer(() => {
  const aliveListData = useContext(reportContext);
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
          {aliveListData.aliveList.length === 0 ? (
            <></>
          ) : (
            <>
              {aliveListData.aliveList.map((list, index) => (
                <AliveData AliveList={list} index={index} key={index} />
              ))}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
});

export default reportAliveCheck;
