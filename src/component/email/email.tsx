import React, { useContext } from "react";
import { Nav, NavItem, NavLink, Container, Row, Col } from "reactstrap";
import Sender from "./senderPage";
import Receiver from "./receiverPage";
import EmailSendPage from "./emailPage";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import { emailContext } from "../../context/emailContext";
import {
  EmailNavBar,
  EmailNavMobile,
  EmailPageLogo,
  EmailPagePosition,
  EmailMenuBarSelectNavItemText,
  EmailNavBarDefaultFontSetting,
  EmailMenuBarSelectNavItemTextMobile,
  EmailNavBarDefaultFontSettingMobile
} from "./styled";

const email = observer(() => {
  const navBar = useContext(navBarContext);
  const email = useContext(emailContext);
  const changeMode = (index: number) => {
    if (index === 3) {
      email.getEmailReportOnOff();
    }
    navBar.emailNavBar = index;
  };

  return (
    <div>
      <Container>
        <EmailPagePosition>
          {navBar.emailNavBar === 1 ? (
            <>
              <EmailPageLogo className="display-4">Sender</EmailPageLogo>
            </>
          ) : (
            <>
              {navBar.emailNavBar === 2 ? (
                <EmailPageLogo className="display-4">Receiver</EmailPageLogo>
              ) : (
                <>
                  {navBar.emailNavBar === 3 ? (
                    <EmailPageLogo className="display-4">Email</EmailPageLogo>
                  ) : (
                    <div></div>
                  )}
                </>
              )}
            </>
          )}
          <Row>
            <Col sm="2">
              {window.innerWidth >= 768 ? (
                <EmailNavBar>
                  <Nav vertical>
                    <NavItem>
                      {navBar.emailNavBar === 1 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <EmailMenuBarSelectNavItemText>
                            {" "}
                            Sender
                          </EmailMenuBarSelectNavItemText>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <EmailNavBarDefaultFontSetting>
                            Sender
                          </EmailNavBarDefaultFontSetting>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.emailNavBar === 2 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <EmailMenuBarSelectNavItemText>
                            Receiver
                          </EmailMenuBarSelectNavItemText>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <EmailNavBarDefaultFontSetting>
                            Receiver
                          </EmailNavBarDefaultFontSetting>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.emailNavBar === 3 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(3);
                          }}
                        >
                          {" "}
                          <EmailMenuBarSelectNavItemText>
                            Email
                          </EmailMenuBarSelectNavItemText>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(3);
                          }}
                        >
                          <EmailNavBarDefaultFontSetting>
                            Email
                          </EmailNavBarDefaultFontSetting>
                        </NavLink>
                      )}
                    </NavItem>
                  </Nav>
                </EmailNavBar>
              ) : (
                <div>
                  <EmailNavMobile>
                    <NavItem>
                      {navBar.emailNavBar === 1 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <EmailMenuBarSelectNavItemTextMobile>
                            {" "}
                            Sender
                          </EmailMenuBarSelectNavItemTextMobile>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <EmailNavBarDefaultFontSettingMobile>
                            Sender
                          </EmailNavBarDefaultFontSettingMobile>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.emailNavBar === 2 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <EmailMenuBarSelectNavItemTextMobile>
                            Receiver
                          </EmailMenuBarSelectNavItemTextMobile>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <EmailNavBarDefaultFontSettingMobile>
                            Receiver
                          </EmailNavBarDefaultFontSettingMobile>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.emailNavBar === 3 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(3);
                          }}
                        >
                          {" "}
                          <EmailMenuBarSelectNavItemTextMobile>
                            Email
                          </EmailMenuBarSelectNavItemTextMobile>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(3);
                          }}
                        >
                          <EmailNavBarDefaultFontSettingMobile>
                            Email
                          </EmailNavBarDefaultFontSettingMobile>
                        </NavLink>
                      )}
                    </NavItem>
                  </EmailNavMobile>
                  <hr />
                </div>
              )}
            </Col>
            <Col sm="10">
              {navBar.emailNavBar === 1 ? (
                <div>
                  <Sender />
                </div>
              ) : (
                <div>
                  {navBar.emailNavBar === 2 ? (
                    <div>
                      <Receiver />
                    </div>
                  ) : (
                    <div>
                      {navBar.emailNavBar === 3 ? (
                        <div>
                          <EmailSendPage />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </EmailPagePosition>
      </Container>
    </div>
  );
});

export default email;
