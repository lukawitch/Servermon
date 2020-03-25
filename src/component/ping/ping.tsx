import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Row, Col, Container } from "reactstrap";
import PingInfo from "./pingInfo";
import PingEdit from "./pingEdit";
import { navBarContext } from "../../context/navBarContext";
import { pingContext } from "../../context/pingContext";
import {
  PingPageLogo,
  PingAliveCheckOnOff,
  PingEditButton,
  PingEditAndInfoPosition,
  PingShowInfoPosition,
  PingAliveOnText
} from "./styled";

const ping = observer(() => {
  const navBar = useContext(navBarContext);
  const ping = useContext(pingContext);

  const onOff = () => {
    if (ping.ping.onOff === "off") {
      ping.ping.onOff = "on";
    } else {
      ping.ping.onOff = "off";
    }
    ping.settingPingOnOff();
  };
  const editOrNot = () => {
    navBar.pingAliveCheckEdit = !navBar.pingAliveCheckEdit;
  };

  return (
    <PingEditAndInfoPosition>
      <Container>
        <PingPageLogo className="display-4">Ping</PingPageLogo>
        <PingAliveCheckOnOff>
          <PingAliveOnText>AliveCheck ON/OFF</PingAliveOnText>
          <span>
            <Button onClick={onOff} outline color="info">
              {ping.ping.onOff}
            </Button>
          </span>
        </PingAliveCheckOnOff>
        {ping.ping.onOff === "on" ? (
          <div>
            <Row>
              <Col sm="12">
                <PingAliveCheckOnOff>
                  <Row>
                    <Col xs="6"></Col>
                    <Col xs="6">
                      <PingEditButton onClick={editOrNot} outline color="info">
                        Edit
                      </PingEditButton>
                    </Col>
                  </Row>
                </PingAliveCheckOnOff>
                <PingShowInfoPosition>
                  {!navBar.pingAliveCheckEdit ? (
                    <div>
                      <PingInfo />
                    </div>
                  ) : (
                    <div>
                      <PingEdit />
                    </div>
                  )}
                </PingShowInfoPosition>
              </Col>
              <Col sm="2"></Col>
            </Row>
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </PingEditAndInfoPosition>
  );
});

export default ping;
