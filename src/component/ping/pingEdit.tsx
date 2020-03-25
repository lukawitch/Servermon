import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Form, FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import { pingContext } from "../../context/pingContext";
import {
  PingFormSubTitle,
  PingEditPosition,
  PingEditButtonLayoutSetting
} from "./styled";

const pingEdit = observer(() => {
  const pingEdit = useContext(pingContext);
  const navBar = useContext(navBarContext);

  const handleChangeInterval = (event: React.ChangeEvent<HTMLInputElement>) => {
    pingEdit.ping.interval = event.target.value;
  };
  const handleChangeTimeout = (event: React.ChangeEvent<HTMLInputElement>) => {
    pingEdit.ping.timeout = event.target.value;
  };

  const defaultSetting = () => {
    pingEdit.getPingDefault();
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navBar.pingAliveCheckEdit = !navBar.pingAliveCheckEdit;
    pingEdit.setPingValue();
  };

  return (
    <PingEditPosition>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <PingFormSubTitle xs="2">
              {" "}
              <Label for="examplePassword">Interval</Label>
            </PingFormSubTitle>
            <Col xs="10">
              {" "}
              <Input
                type="text"
                onChange={handleChangeInterval}
                value={pingEdit.ping.interval}
                placeholder="Interval Limited Value"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <PingFormSubTitle xs="2">
              {" "}
              <Label for="exampleUrl">⁠TimeOut</Label>
            </PingFormSubTitle>
            <Col xs="10">
              {" "}
              <Input
                type="text"
                onChange={handleChangeTimeout}
                value={pingEdit.ping.timeout}
                placeholder="TimeOut Limited Value"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <PingFormSubTitle xs="2">
              {" "}
              <Label for="exampleUrl"></Label>
            </PingFormSubTitle>
            <Col xs="10">
              <Button outline color="info" block onClick={defaultSetting}>
                default-setting
              </Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <PingFormSubTitle xs="2">
              {" "}
              <Label for="exampleUrl">⁠</Label>
            </PingFormSubTitle>
            <Col xs="10">
              {/*<Input type="submit" value="Edit" />*/}
              <PingEditButtonLayoutSetting type="submit" outline color="info">
                Edit
              </PingEditButtonLayoutSetting>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </PingEditPosition>
  );
});

export default pingEdit;
