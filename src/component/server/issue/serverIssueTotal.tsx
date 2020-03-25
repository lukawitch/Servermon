import React from "react";
import { observer } from "mobx-react-lite";
import { Row, Col } from "reactstrap";
import MemoryTotal from "./serverIssueMemory";
import StorageTotal from "./serverIssueStorage";
import { ServerIssuePagePosition } from "./styled";

const seerverTotalIssue = observer(() => {
  return (
    <ServerIssuePagePosition>
      <Row>
        <Col sm="6">
          <MemoryTotal />
        </Col>
        <Col sm="6">
          <StorageTotal />
        </Col>
      </Row>
    </ServerIssuePagePosition>
  );
});

export default seerverTotalIssue;
