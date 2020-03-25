import React from "react";
import { observer } from "mobx-react-lite";
import { MemoryInfo } from "../../model/host";

const hostMemoryCheckData = observer(
  ({ memoryList, index }: { memoryList: MemoryInfo; index: number }) => {
    return (
      <tr>
        <td>{memoryList.ip}</td>
        <td>{memoryList.info}</td>
        <td>
          {memoryList.total}
          {memoryList.totalStorageSet}
        </td>
        <td>
          {memoryList.useable}
          {memoryList.usableStorageSet}
        </td>
        <td>{memoryList.percent}%</td>
      </tr>
    );
  }
);

export default hostMemoryCheckData;
