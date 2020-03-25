import React from "react";
import { observer } from "mobx-react-lite";
import { AliveInfo } from "../../model/host";

const reportAliveCheckData = observer(
  ({ AliveList, index }: { AliveList: AliveInfo; index: number }) => {
    return (
      <tr>
        <td>{AliveList.ip}</td>
        <td>{AliveList.name}</td>
        <td>{AliveList.status}</td>
      </tr>
    );
  }
);

export default reportAliveCheckData;
