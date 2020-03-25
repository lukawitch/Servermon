import React from "react";
import { observer } from "mobx-react-lite";
import { UncontrolledAlert } from "reactstrap";
import { MemoryInfo } from "../../../model/host";

const serverMemoryIssue = observer(
  ({ memoryList, index }: { memoryList: MemoryInfo; index: number }) => {
    return (
      <div>
        <UncontrolledAlert color="danger">
          {memoryList.info} 가 {memoryList.percent}% 사용하였습니다.
        </UncontrolledAlert>
      </div>
    );
  }
);

export default serverMemoryIssue;
