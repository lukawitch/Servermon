import React from "react";
import { observer } from "mobx-react-lite";
import { UncontrolledAlert } from "reactstrap";
import { DiskInfo } from "../../../model/host";

const serverDiskIssue = observer(
  ({ diskList, index }: { diskList: DiskInfo; index: number }) => {
    return (
      <div>
        <UncontrolledAlert color="danger">
          disk{index} 이(가) {diskList.percent}% 사용하였습니다.
        </UncontrolledAlert>
      </div>
    );
  }
);

export default serverDiskIssue;
