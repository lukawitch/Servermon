import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import { emailContext } from "../../context/emailContext";
import { EmailFormTitle, EmailReceiverAddLayoutSetting } from "./styled";

const receiverAdd = observer(() => {
  const navBar = useContext(navBarContext);
  const receiverInfo = useContext(emailContext);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    receiverInfo.receiverName = event.target.value;
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    receiverInfo.receiverEmail = event.target.value;
  };
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    receiverInfo.receiveType = event.target.value;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let receiverSetAdd;
    receiverSetAdd = {
      name: receiverInfo.receiverName,
      mail: receiverInfo.receiverEmail,
      type: receiverInfo.receiveType
    };
    receiverInfo.receiverList.push(receiverSetAdd);
    receiverInfo.receiverName = "";
    receiverInfo.receiveType = "";
    receiverInfo.receiverEmail = "";
    navBar.receiverAddOrNot = !navBar.receiverAddOrNot;
    receiverInfo.addReceiver(receiverSetAdd);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <EmailFormTitle sm="2">
              <Label for="exampleName">name</Label>
            </EmailFormTitle>

            <Col sm="10">
              <Input
                type="text"
                onChange={handleChangeName}
                value={receiverInfo.receiverName}
                placeholder="Receivername"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle sm="2">
              {" "}
              <Label for="exampleEmail">Email</Label>
            </EmailFormTitle>
            <Col sm="10">
              {" "}
              <Input
                type="email"
                onChange={handleChangeEmail}
                value={receiverInfo.receiverEmail}
                placeholder="email"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle sm="2">
              {" "}
              <Label for="examplePassword">type</Label>
            </EmailFormTitle>
            <Col sm="10">
              <Input
                value={receiverInfo.receiveType}
                onChange={handleChangeType}
                type="select"
              >
                <option value="to">받는사람</option>
                <option value="cc">참조</option>
                <option value="bcc">숨은참조</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <EmailFormTitle sm="2"></EmailFormTitle>
            <Col sm="10">
              {/*<Input type="submit" value="ADD" />*/}
              <EmailReceiverAddLayoutSetting type="submit" outline color="info">
                Edit
              </EmailReceiverAddLayoutSetting>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
});

export default receiverAdd;
