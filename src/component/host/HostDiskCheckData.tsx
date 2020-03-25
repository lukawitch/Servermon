import React from "react";
import { observer } from "mobx-react-lite";
import { DiskInfo } from "../../model/host";

const hostDiskCheckData = observer(
  ({ DiskList, index }: { DiskList: DiskInfo; index: number }) => {
    return (
      <tr>
        <td>{DiskList.ip}</td>
        <td>{DiskList.info}</td>
        <td>
          {DiskList.total}
          {DiskList.totalStorageSet}
        </td>
        <td>
          {DiskList.useable}
          {DiskList.usableStorageSet}
        </td>
        <td>{DiskList.percent}%</td>
      </tr>
    );
  }
);

export default hostDiskCheckData;
