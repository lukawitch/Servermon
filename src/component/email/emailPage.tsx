import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col } from "reactstrap";
import { navBarContext } from "../../context/navBarContext";
import TimeEdit from "./emailEditTime";
import { emailContext } from "../../context/emailContext";
import {
  EmailSettingPosition,
  EmailReservationTime,
  EmailReservationText,
  EmailPageText
} from "./styled";

const emailPage = observer(() => {
  const navBar = useContext(navBarContext);
  const time = useContext(emailContext);

  const reservationOnOff = () => {
    if (time.emailTime.onOff === "off") {
      time.emailTime.onOff = "on";
    } else if (time.emailTime.onOff === "on") {
      time.emailTime.onOff = "off";
    } else {
      time.emailTime.onOff = "loading";
    }
    time.setEmailReportOnOff();
  };

  const reservationTime = () => {
    navBar.reservationTimeEdit = !navBar.reservationTimeEdit;
  };
  const getNow = () => {
    time.setEmailReportNow();
  };

  return (
    <div>
      <EmailSettingPosition>
      <Col sm="2"></Col>
        <Col sm="6">
          {" "}
          <EmailPageText>즉시보고</EmailPageText>
          <Button outline color="secondary" onClick={getNow}>
            Send
          </Button>
        </Col>
        </EmailSettingPosition>
      <EmailSettingPosition>
      <Col sm="2"></Col>
      <Col sm="6">
          {" "}
          <EmailPageText>예약보고</EmailPageText>
          <Button onClick={reservationOnOff} outline color="secondary">
            {time.emailTime.onOff}
          </Button>
        </Col>
      </EmailSettingPosition>

 
      {time.emailTime.onOff === "on" ? (
           
        <EmailReservationTime>
             <EmailSettingPosition>
             <Col sm="2"></Col>
             <Col sm="6">
          <EmailReservationText>
            <EmailPageText>
              ⁠예약 시간 {time.emailTime.reportTime}{" "}
            </EmailPageText>
            <span>
              <Button onClick={reservationTime} outline color="secondary">
                edit
              </Button>
            </span>
          </EmailReservationText>
          </Col>
      </EmailSettingPosition>
          {navBar.reservationTimeEdit ? (
            <EmailReservationTime>
              <TimeEdit />
            </EmailReservationTime>
          ) : (
            <div></div>
          )}
        </EmailReservationTime>
      ) : (
        <div></div>
      )}

    </div>
  );
});

export default emailPage;
