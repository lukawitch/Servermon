import React from "react";
import { observer } from "mobx-react-lite";
import { BackupInfo } from "../../model/host";

const hostFileInfo = observer(
  ({ backUpList, index }: { backUpList: BackupInfo; index: number }) => {
    return (
      <tr>
        <td>{backUpList.ip}</td>
        <td>{backUpList.type}</td>
        <td>{backUpList.name}</td>
        <td>{backUpList.folderName}</td>
        <td>
          {backUpList.size}
          {backUpList.storage}
        </td>
        <td>{backUpList.date}</td>
      </tr>
    );
  }
);

export default hostFileInfo;
