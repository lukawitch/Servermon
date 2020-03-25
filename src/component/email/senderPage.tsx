import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "reactstrap";
import SenderInfo from "./senderInfo";
import SenderInfoEdit from "./sendInfoEdit";
import { emailContext } from "../../context/emailContext";
import {
  EmailSend,
  EmailSenderEmaliButtonPosition,
  EmailSenderInfoAndEdit,
  EmailEditButton,
  EmailOnOffText
} from "./styled";
const senderPage = observer(() => {
  const hostInfo = useContext(emailContext);

  const onOff = () => {
    if (hostInfo.emailOnOff === "off") {
      hostInfo.emailOnOff = "on";
    } else {
      hostInfo.emailOnOff = "off";
    }
  };
  const editOrNot = () => {
    hostInfo.editOnOff = !hostInfo.editOnOff;
  };

  return (
    <div>
      <Row>
        <Col sm="12">
          <EmailSenderEmaliButtonPosition>
            <Row>
              <Col xs="8">
                {" "}
                <EmailSend>
                  <EmailOnOffText>Email ON/OFF</EmailOnOffText>
                  <span>
                    <Button onClick={onOff} outline color="info">
                      {hostInfo.emailOnOff}
                    </Button>
                  </span>
                </EmailSend>
              </Col>
              <Col xs="4">
                <EmailEditButton onClick={editOrNot} outline color="info">
                  Edit
                </EmailEditButton>
              </Col>
            </Row>
          </EmailSenderEmaliButtonPosition>

          <EmailSenderInfoAndEdit>
            {!hostInfo.editOnOff ? (
              <div>
                <SenderInfo />
              </div>
            ) : (
              <div>
                <SenderInfoEdit />
              </div>
            )}
          </EmailSenderInfoAndEdit>
        </Col>
      </Row>
    </div>
  );
});

export default senderPage;
