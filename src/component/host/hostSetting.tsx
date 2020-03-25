import React, { useContext } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import HostAdd from "./hostSettingAdd";
import HostList from "./hostListAndInfo";
import {
  HostNavBar,
  HostNavMobile,
  HostPageLogo,
  HostReportPosition,
  HostMenuBarSelectFontSetting,
  HostNavBarDefaultFontSetting,
  HostMenuBarSelectFontSettingMobile,
  HostNavBarDefaultFontSettingMobile
} from "./styled";

const hostSetting = observer(() => {
  const navBar = useContext(navBarContext);
  const changeMode = (index: number) => {
    navBar.hostSettingNavBar = index;
  };

  return (
    <div>
      <Container>
        <HostReportPosition>
          {navBar.hostSettingNavBar === 1 ? (
            <HostPageLogo className="display-4">HostAdd</HostPageLogo>
          ) : (
            <>
              {navBar.hostSettingNavBar === 2 ? (
                <>
                  <HostPageLogo className="display-4">HostList</HostPageLogo>
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <Row>
            <Col sm="2">
              {window.innerWidth >= 768 ? (
                <HostNavBar>
                  <Nav vertical>
                    <NavItem>
                      {navBar.hostSettingNavBar === 1 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <HostMenuBarSelectFontSetting>
                            {" "}
                            hostadd
                          </HostMenuBarSelectFontSetting>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <HostNavBarDefaultFontSetting>
                            hostadd
                          </HostNavBarDefaultFontSetting>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.hostSettingNavBar === 2 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <HostMenuBarSelectFontSetting>
                            {" "}
                            host
                          </HostMenuBarSelectFontSetting>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <HostNavBarDefaultFontSetting>
                            {" "}
                            host
                          </HostNavBarDefaultFontSetting>
                        </NavLink>
                      )}
                    </NavItem>
                  </Nav>
                </HostNavBar>
              ) : (
                <div>
                  <HostNavMobile>
                    <NavItem>
                      {navBar.hostSettingNavBar === 1 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <HostMenuBarSelectFontSettingMobile>
                            {" "}
                            hostadd
                          </HostMenuBarSelectFontSettingMobile>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(1);
                          }}
                        >
                          <HostNavBarDefaultFontSettingMobile>
                            hostadd
                          </HostNavBarDefaultFontSettingMobile>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {navBar.hostSettingNavBar === 2 ? (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <HostMenuBarSelectFontSettingMobile>
                            {" "}
                            host
                          </HostMenuBarSelectFontSettingMobile>
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => {
                            changeMode(2);
                          }}
                        >
                          <HostNavBarDefaultFontSettingMobile>
                            {" "}
                            host
                          </HostNavBarDefaultFontSettingMobile>
                        </NavLink>
                      )}
                    </NavItem>
                  </HostNavMobile>
                  <hr />
                </div>
              )}
            </Col>
            <Col sm="10">
              {navBar.hostSettingNavBar === 1 ? (
                <div>
                  <HostAdd />
                </div>
              ) : (
                <div>
                  {navBar.hostSettingNavBar === 2 ? (
                    <div>
                      <HostList />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </HostReportPosition>
      </Container>
    </div>
  );
});

export default hostSetting;
