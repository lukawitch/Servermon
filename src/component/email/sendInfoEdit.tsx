import React, { useContext } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { emailContext } from "../../context/emailContext";
import {
  EmailSendInfoAndEditPage,
  EmailFormTitle,
  EmailTimeSetEditButtonLayoutSetting
} from "./styled";

const sendInfoEdit = observer(() => {
  const senderInfo = useContext(emailContext);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    senderInfo.senderInfo.name = event.target.value;
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    senderInfo.senderInfo.mail = event.target.value;
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    senderInfo.senderInfo.pwd = event.target.value;
  };
  const handleChangeHost = (event: React.ChangeEvent<HTMLInputElement>) => {
    senderInfo.senderInfo.smtpHost = event.target.value;
  };
  const handleChangePort = (event: React.ChangeEvent<HTMLInputElement>) => {
    senderInfo.senderInfo.smtpPort = Number(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    senderInfo.editOnOff = !senderInfo.editOnOff;
    senderInfo.addSender();
  };

  return (
    <EmailSendInfoAndEditPage>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <EmailFormTitle xs="2">
              <Label for="exampleName">name</Label>
            </EmailFormTitle>

            <Col xs="10">
              <Input
                type="text"
                onChange={handleChangeName}
                value={senderInfo.senderInfo.name}
                placeholder="Sendername"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle xs="2">
              {" "}
              <Label for="exampleEmail">Email</Label>
            </EmailFormTitle>
            <Col xs="10">
              {" "}
              <Input
                type="email"
                onChange={handleChangeEmail}
                value={senderInfo.senderInfo.mail}
                placeholder="email"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle xs="2">
              {" "}
              <Label for="examplePassword">Password</Label>
            </EmailFormTitle>
            <Col xs="10">
              {" "}
              <Input
                type="password"
                onChange={handleChangePassword}
                value={senderInfo.senderInfo.pwd}
                placeholder="password"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle xs="2">
              {" "}
              <Label for="exampleUrl">⁠SMTP HOST</Label>
            </EmailFormTitle>
            <Col xs="10">
              {" "}
              <Input
                type="text"
                onChange={handleChangeHost}
                value={senderInfo.senderInfo.smtpHost}
                placeholder="HostURL"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle xs="2">
              <Label for="exampleNumber">⁠SMTP PORT</Label>
            </EmailFormTitle>
            <Col xs="10">
              {" "}
              <Input
                type="number"
                onChange={handleChangePort}
                value={senderInfo.senderInfo.smtpPort}
                placeholder="Portnumber"
              />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <EmailFormTitle xs="2"></EmailFormTitle>
            <Col xs="10">
              <EmailTimeSetEditButtonLayoutSetting
                type="submit"
                outline
                color="info"
              >
                Edit
              </EmailTimeSetEditButtonLayoutSetting>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </EmailSendInfoAndEditPage>
  );
});

export default sendInfoEdit;
