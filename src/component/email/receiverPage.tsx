import React, { useContext } from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import ReceiverAdd from "./receiverAdd";
import ReceiverList from "./receiverList";
import { emailContext } from "../../context/emailContext";
import {
  EmailButtonList,
  EmailReceiverAddPage,
  EmailReceiverListAndButton,
  EmailNoItem
} from "./styled";

const reciverPage = observer(() => {
  const navBar = useContext(navBarContext);
  const receiverList = useContext(emailContext);

  const receiverAddNot = () => {
    navBar.receiverAddOrNot = !navBar.receiverAddOrNot;
  };

  const deleteAll = () => {
    alert("Receiver전체를 삭제합니다.");
    receiverList.deleteReceiverAll();
  };

  return (
    <div>
      {navBar.receiverAddOrNot ? (
        <EmailReceiverAddPage>
          <ReceiverAdd />
        </EmailReceiverAddPage>
      ) : (
        <div></div>
      )}
      <EmailReceiverListAndButton>
        <EmailButtonList>
          <ButtonGroup>
            <Button onClick={receiverAddNot} outline color="success">
              Add
            </Button>
            <Button outline color="danger" onClick={deleteAll}>
              delete all
            </Button>
          </ButtonGroup>
        </EmailButtonList>

        {receiverList.receiverList === null ||
        receiverList.receiverList.length === 0 ? (
          <EmailNoItem>Receiver가 존재하지 않습니다.</EmailNoItem>
        ) : (
          <Table hover>
            <thead>
              <tr>
                <th>email</th>
                <th>Name</th>
                <th>type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment>
                {receiverList.receiverList.map((list, index) => (
                  <ReceiverList receiverList={list} index={index} key={index} />
                ))}
              </React.Fragment>
            </tbody>
          </Table>
        )}
      </EmailReceiverListAndButton>
    </div>
  );
});

export default reciverPage;
