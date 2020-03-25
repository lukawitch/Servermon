import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Form, FormGroup, Col, Label, Input, Row } from "reactstrap";
import { hostContext } from "../../context/hostContext";
import {
  HostFormSubTitle,
  HostAddPosition,
  HostAddButtonLayoutSetting
} from "./styled";
import { navBarContext } from "../../context/navBarContext";

const hostSettingAdd = observer(() => {
  const hostAdd = useContext(hostContext);
  const navBar = useContext(navBarContext);

  const addressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hostAdd.address = event.target.value;
  };
  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hostAdd.name = event.target.value;
  };
  const modeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hostAdd.mode = event.target.value;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hostAddValue;
    hostAddValue = {
      name: hostAdd.name,
      ip: hostAdd.address,
      mode: hostAdd.mode,
      monitoringStatus: "off",
      hostAliveCheckTimeOnOff: "off",
      hostAliveCheckStartTime: "0:0",
      hostAliveCheckStopTime: "0:0"
    };
    hostAdd.serverList.push(hostAddValue);
    hostAdd.addHost(hostAddValue).then(()=>{
      navBar.hostSettingNavBar = 2;
    });
    hostAdd.name = "";
    hostAdd.address = "";
    hostAdd.mode = "";
  };

  return (
    <HostAddPosition>
      <HostAddPosition>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Row>
              <HostFormSubTitle xs="2">
                {" "}
                <Label for="exampleUrl">⁠Address</Label>
              </HostFormSubTitle>
              <Col xs="10">
                {" "}
                <Input
                  type="text"
                  onChange={addressChange}
                  value={hostAdd.address}
                  placeholder="HostURL"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <HostFormSubTitle xs="2">
                {" "}
                <Label for="exampleEmail">Name</Label>
              </HostFormSubTitle>
              <Col xs="10">
                {" "}
                <Input
                  type="text"
                  onChange={nameChange}
                  value={hostAdd.name}
                  placeholder="HostName"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <HostFormSubTitle xs="2">
                {" "}
                <Label for="examplePassword">Mode</Label>
              </HostFormSubTitle>
              <Col xs="10">
                <Input type="select" onChange={modeChange} value={hostAdd.mode}>
                  <option value="">항목을 선택해주세요</option>
                  <option value="ping">ping</option>
                  <option value="agent">agent</option>
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <HostFormSubTitle xs="2"></HostFormSubTitle>
              <Col xs="10">
                {/*<Input type="submit" value="add" />*/}
                <HostAddButtonLayoutSetting type="submit" outline color="info">
                  Edit
                </HostAddButtonLayoutSetting>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </HostAddPosition>
    </HostAddPosition>
  );
});

export default hostSettingAdd;
