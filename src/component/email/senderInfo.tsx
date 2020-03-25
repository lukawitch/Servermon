import React, { useContext } from "react";
import { Table } from "reactstrap";
import { observer } from "mobx-react-lite";
import { emailContext } from "../../context/emailContext";

const senderInfo = observer(() => {
  const senderInfo = useContext(emailContext);
  return (
    <div>
      <Table bordered>
        <tbody>
          <tr>
            <td>Sender</td>
            <td>{senderInfo.senderInfo.name}</td>
          </tr>
          <tr>
            <td>⁠SMTP HOST 주소</td>
            <td>{senderInfo.senderInfo.smtpHost}</td>
          </tr>
          <tr>
            <td>⁠SMTP PORT 번호</td>
            <td>{senderInfo.senderInfo.smtpPort}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{senderInfo.senderInfo.mail}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default senderInfo;
