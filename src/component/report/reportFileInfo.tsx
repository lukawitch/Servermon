import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "reactstrap";
import InfoData from "./reportFileInfoData";
import { reportContext } from "../../context/reportContext";

const reportFileInfo = observer(() => {
  const backUpList = useContext(reportContext);
  return (
    <div>
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
          {backUpList.backUpList.map((list, index) => (
            <InfoData backUpList={list} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default reportFileInfo;
