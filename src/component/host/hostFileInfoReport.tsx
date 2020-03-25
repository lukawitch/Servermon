import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import { hostContext } from "../../context/hostContext";
import InfoData from "./hostFileInfoData";
import { HostFileInfoTablePosition } from "./styled";

const hostFileInfo = observer(() => {
  const backUpList = useContext(hostContext);

  return (
    <HostFileInfoTablePosition>
      <Table hover>
        <thead>
          <tr>
            <th>Host</th>
            <th>type</th>
            <th>FileName</th>
            <th>FolderName</th>
            <th>size</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {backUpList.hostBackUpList.map((list, index) => (
            <InfoData backUpList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </HostFileInfoTablePosition>
  );
});

export default hostFileInfo;
