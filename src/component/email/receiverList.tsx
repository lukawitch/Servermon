import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "reactstrap";
import { emailContext } from "../../context/emailContext";
import { Receiver } from "../../model/email";

const receiverList = observer(
  ({ receiverList, index }: { receiverList: Receiver; index: number }) => {
    const receiver = useContext(emailContext);
    const deleteReceiver = (index: number) => {
      const mail = receiver.receiverList[index].mail;
      receiver.receiverList.splice(index, 1);
      receiver.deleteReceiver(mail);
    };

    return (
      <tr>
        <td>{receiverList.mail}</td>
        <td>{receiverList.name}</td>
        <td>
          {receiverList.type === "to" ? (
            <>받는사람</>
          ) : (
            <>{receiverList.type === "cc" ? <>참조</> : <>숨은참조</>}</>
          )}
        </td>
        <td>
          {" "}
          <Button
            close
            onClick={() => {
              deleteReceiver(index);
            }}
          />
        </td>
      </tr>
    );
  }
);

export default receiverList;
