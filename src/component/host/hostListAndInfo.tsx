import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Table } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import HostInfo from "./hostInfo";
import HostList from "./hostList";
import { hostContext } from "../../context/hostContext";
import {
  HostInfoPosition,
  HostListPosition,
  HostButtonList,
  HostNoItem
} from "./styled";

const hostListAndInfo = observer(() => {
  const navBar = useContext(navBarContext);
  const hostList = useContext(hostContext);

  const deleteAll = () => {
    if (window.confirm("Host전체를 삭제합니다. 다시한번 확인해주세요")) {
      hostList.deleteHostAll();
    } else {
    }
  };

  return (
    <div>
      {navBar.hostInfoShow ? (
        <HostInfoPosition>
          <HostInfo />
        </HostInfoPosition>
      ) : (
        <div></div>
      )}
      <HostListPosition>
        <HostButtonList>
          <ButtonGroup>
            <Button outline color="danger" onClick={deleteAll}>
              delete all
            </Button>
          </ButtonGroup>
        </HostButtonList>
        {hostList.serverList === null || hostList.serverList.length === 0 ? (
          <HostNoItem>Host에 관한 정보가 없습니다.</HostNoItem>
        ) : (
          <Table hover>
            <thead>
              <tr>
                <th>Address</th>
                <th>Name</th>
                <th>Mode</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment>
                {hostList.serverList.map((list, index) => (
                  <HostList hostList={list} index={index} key={index} />
                ))}
              </React.Fragment>
            </tbody>
          </Table>
        )}
      </HostListPosition>
    </div>
  );
});

export default hostListAndInfo;
