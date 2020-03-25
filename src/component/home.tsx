import React, { useContext } from "react";
import {
  Row,
  Col,
  Card,
  CardText,
  Button,
  Container,
  CardBody
} from "reactstrap";
import { hostContext } from "../context/hostContext";
import { navBarContext } from "../context/navBarContext";
import { observer } from "mobx-react-lite";
import { emailContext } from "../context/emailContext";
import { pingContext } from "../context/pingContext";
import { serverContext } from "../context/serverContext";
import { HomePageLogo, HeaderFont, LinkFont } from "./styled";

const tempHome = observer(() => {
  const host = useContext(hostContext);
  const email = useContext(emailContext);
  const ping = useContext(pingContext);
  const navBar = useContext(navBarContext);
  const server = useContext(serverContext);

  const getMailInfo = () => {
    if (email.senderInfo.mail === "") {
      email.getMail();
    }
  };
  const getHostSettingInfo = () => {
    host.serverListNum = 888;
    navBar.onClickServer = false;
    if (host.serverList.length === 0) {
      navBar.hostInfoShow = false;
      host
        .getHostSetting()
        .then(() => server.getTotalMemoryPercent(host.serverList));
    }
  };
  const getPingInfo = () => {
    if (ping.ping.onOff === "") {
      ping.getPing();
    }
  };
  return (
    <div>
      <Container>
        <HomePageLogo className="display-4">HOME</HomePageLogo>
        <br />
        <br />
        <Row>
          <Col sm="4">
            <br />
            <br />
            <Card>
              <HeaderFont>Server</HeaderFont>
              <CardBody>
                <CardText>
                  Server를 선택시 그 서버에 관한 Memory와 Storage 정보를 볼 수
                  있습니다.
                </CardText>
              </CardBody>
              <LinkFont to="/serverlist" onClick={getHostSettingInfo}>
                {" "}
                <Button outline color="secondary" block>
                  Go somewhere
                </Button>
              </LinkFont>
            </Card>
          </Col>
          <Col sm="4">
            <br />
            <br />
            <Card>
              <HeaderFont>Email</HeaderFont>
              <CardBody>
                <CardText>
                  Sender와 Receiver를 설정하고 Email에 관한 설정도 할 수
                  있습니다.
                </CardText>
              </CardBody>
              <LinkFont to="/email" onClick={getMailInfo}>
                <Button outline color="info" block>
                  Go somewhere
                </Button>
              </LinkFont>
            </Card>
          </Col>
          <Col sm="4">
            <br />
            <br />
            <Card>
              <HeaderFont>HostSetting</HeaderFont>
              <CardBody>
                <CardText>
                  Host를 추가하고 Host에 관한 정보를 볼 수 있습니다.
                </CardText>
              </CardBody>
              <LinkFont to="/hostsetting" onClick={getHostSettingInfo}>
                <Button block outline color="success">
                  Go somewhere
                </Button>
              </LinkFont>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="2"></Col>
          <Col sm="4">
            <br />
            <br />
            <Card>
              <HeaderFont>Ping</HeaderFont>
              <CardBody>
                <CardText>
                  Ping 에 관한 정보를 보고 그것에 따른 설정과 동작 onoff를 할
                  수있습니다.
                </CardText>
              </CardBody>
              <LinkFont to="/ping" onClick={getPingInfo}>
                <Button block outline color="info">
                  Go somewhere
                </Button>
              </LinkFont>
            </Card>
          </Col>
          <Col sm="4">
            <br />
            <br />
            <Card>
              <HeaderFont>Report</HeaderFont>
              <CardBody>
                <CardText>
                  AliveCheck보고서 Resource Check보고서등 다양한 보고서를 볼 수
                  있습니다.
                </CardText>
              </CardBody>
              <LinkFont to="report">
                <Button block outline color="success">
                  Go somewhere
                </Button>
              </LinkFont>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default tempHome;
