import React, { useContext, useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../context/navBarContext";
import SubNav from "./server/subNavBar";
import { hostContext } from "../context/hostContext";
import { emailContext } from "../context/emailContext";
import { pingContext } from "../context/pingContext";
import { serverContext } from "../context/serverContext";
import {
  TopNavBarTitleLogo,
  TopNavBarPosition,
  TopNavBarItemPosition,
  TopNavBarItemText,
  NoDeviceNotice,
  TopNavbarHomePosition,
  HomeTitlePosition,
  TopNavBarTitleLogoMoblie,
  TopNavbarHomePositionMoblie,
  TopMenuBarSelectNavItemText,
  TopMenuBarItemLineSetting
} from "./styled";

const topNavBar = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const navBar = useContext(navBarContext);
  const host = useContext(hostContext);
  const server = useContext(serverContext);
  const email = useContext(emailContext);
  const ping = useContext(pingContext);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const getMailInfo = () => {
    navBar.topNavBarNumber = 2;
    if (email.senderInfo.mail === "") {
      email.getMail();
    }
  };
  const getServerSettingInfo = () => {
    host.serverListNum = 888;
    navBar.topNavBarNumber = 1;
    navBar.onClickServer = false;
    if (host.serverList.length === 0) {
      navBar.hostInfoShow = false;
      host
        .getHostSetting()
        .then(() => server.getTotalMemoryPercent(host.serverList));
    }
  };

  const getHostSettingInfo = () => {
    host.serverListNum = 888;
    navBar.topNavBarNumber = 3;
    navBar.onClickServer = false;
    if (host.serverList.length === 0) {
      navBar.hostInfoShow = false;
      host
        .getHostSetting()
        .then(() => server.getTotalMemoryPercent(host.serverList));
    }
  };

  const getPingInfo = () => {
    navBar.topNavBarNumber = 4;
    if (ping.ping.onOff === "") {
      ping.getPing();
    }
  };

  const getReportInfo = () => {
    navBar.topNavBarNumber = 5;
  };

  return (
    <div>
      <Navbar color="faded" light>
        {window.innerWidth >= 768 ? (
          <TopNavbarHomePosition href="/" className="mr-auto">
            <HomeTitlePosition>
              <TopNavBarTitleLogo>ServerMon</TopNavBarTitleLogo>
            </HomeTitlePosition>
          </TopNavbarHomePosition>
        ) : (
          <TopNavbarHomePositionMoblie href="/" className="mr-auto">
            <TopNavBarTitleLogoMoblie>ServerMon</TopNavBarTitleLogoMoblie>
          </TopNavbarHomePositionMoblie>
        )}

        <NavbarToggler onClick={toggleNavbar} className="mr-2" />

        <Collapse isOpen={!collapsed} navbar>
          <TopNavBarPosition>
            <Row>
              <Col sm="1"></Col>
              <Col sm="10">
                <TopNavBarItemPosition>
                  <NavItem>
                    {navBar.topNavBarNumber === 1 ? (
                      <TopNavBarItemText
                        to="/serverlist"
                        onClick={getServerSettingInfo}
                      >
                        <TopMenuBarSelectNavItemText>
                          {" "}
                          Server
                        </TopMenuBarSelectNavItemText>
                        <TopMenuBarItemLineSetting />
                      </TopNavBarItemText>
                    ) : (
                      <TopNavBarItemText
                        to="/serverlist"
                        onClick={getServerSettingInfo}
                      >
                        Server
                      </TopNavBarItemText>
                    )}
                  </NavItem>

                  <NavItem>
                    {navBar.topNavBarNumber === 2 ? (
                      <TopNavBarItemText to="/email" onClick={getMailInfo}>
                        <TopMenuBarSelectNavItemText>
                          Email
                        </TopMenuBarSelectNavItemText>
                        <TopMenuBarItemLineSetting />
                      </TopNavBarItemText>
                    ) : (
                      <TopNavBarItemText to="/email" onClick={getMailInfo}>
                        {" "}
                        Email
                      </TopNavBarItemText>
                    )}
                  </NavItem>
                  <NavItem>
                    {navBar.topNavBarNumber === 3 ? (
                      <TopNavBarItemText
                        to="/hostsetting"
                        onClick={getHostSettingInfo}
                      >
                        <TopMenuBarSelectNavItemText>
                          {" "}
                          Host
                        </TopMenuBarSelectNavItemText>
                        <TopMenuBarItemLineSetting />
                      </TopNavBarItemText>
                    ) : (
                      <TopNavBarItemText
                        to="/hostsetting"
                        onClick={getHostSettingInfo}
                      >
                        Host
                      </TopNavBarItemText>
                    )}
                  </NavItem>
                  <NavItem>
                    {navBar.topNavBarNumber === 4 ? (
                      <TopNavBarItemText to="/ping" onClick={getPingInfo}>
                        <TopMenuBarSelectNavItemText>
                          PING
                        </TopMenuBarSelectNavItemText>
                        <TopMenuBarItemLineSetting />
                      </TopNavBarItemText>
                    ) : (
                      <TopNavBarItemText to="/ping" onClick={getPingInfo}>
                        PING
                      </TopNavBarItemText>
                    )}
                  </NavItem>
                  <NavItem>
                    {navBar.topNavBarNumber === 5 ? (
                      <TopNavBarItemText to="/report" onClick={getReportInfo}>
                        <TopMenuBarSelectNavItemText>
                          Report
                        </TopMenuBarSelectNavItemText>
                        <TopMenuBarItemLineSetting />
                      </TopNavBarItemText>
                    ) : (
                      <TopNavBarItemText to="/report" onClick={getReportInfo}>
                        Report
                      </TopNavBarItemText>
                    )}
                  </NavItem>
                </TopNavBarItemPosition>
              </Col>
              <Col sm="1"></Col>
            </Row>
          </TopNavBarPosition>
        </Collapse>
      </Navbar>
      <hr />
      {navBar.onClickServer ? (
        <div>
          {host.hostMemoryStateList.length === 0 ? (
            <div>
              <NoDeviceNotice>장치의 정보가 없습니다.</NoDeviceNotice>
            </div>
          ) : (
            <div>
              {" "}
              <SubNav />
            </div>
          )}
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
});

export default topNavBar;
