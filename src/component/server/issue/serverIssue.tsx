import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../../context/hostContext";
import { ListGroup, Container } from "reactstrap";
import Memory from "./serverMemoryIssue";
import Disk from "./serverDiskIssue";
import {
  ServerIssueTotalPosition,
  ServerIssuePageLogo,
  ServerIssuePosition
} from "./styled";
import TotalTable from "./serverIssueTotal";
import { Redirect } from "react-router";

const serverIssue = observer(() => {
  const host = useContext(hostContext);

  return (
    <ServerIssueTotalPosition>
      {host.hostMemoryStateList.length === 0 ? (
        <>
          <Redirect to="/serverlist" />
        </>
      ) : (
        <>
          <ServerIssuePageLogo className="display-4">Issue</ServerIssuePageLogo>
          <Container>
            <ServerIssuePosition>
              <ListGroup>
                {host.hostMemoryStateList[0].percent > 80 ? (
                  <div>
                    <Memory
                      memoryList={host.hostMemoryStateList[0]}
                      index={0}
                    />{" "}
                  </div>
                ) : (
                  <div></div>
                )}{" "}
                {host.hostDiskStateList.map((list, index) => (
                  <div key={index}>
                    {list.percent > 80 ? (
                      <div>
                        <Disk diskList={list} index={index} key={index} />
                      </div>
                    ) : (
                      <div>{}</div>
                    )}
                  </div>
                ))}
              </ListGroup>
            </ServerIssuePosition>
            <TotalTable />
          </Container>
        </>
      )}
    </ServerIssueTotalPosition>
  );
});

export default serverIssue;
