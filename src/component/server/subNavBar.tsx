import React, { useContext } from "react";
import { NavItem } from "reactstrap";
import { observer } from "mobx-react-lite";
import { navBarContext } from "../../context/navBarContext";
import {
  ServerItemNavBar,
  ServerSubNavBarActive,
  ServerSubNavBar
} from "./styled";

const subNavBar = observer(() => {
  const navBar = useContext(navBarContext);

  const changeNumber = (index: number) => {
    navBar.submenuCheck = index;
  };

  return (
    <div>
      <ServerItemNavBar tabs>
        <NavItem>
          {navBar.submenuCheck === 1 ? (
            <div>
              <ServerSubNavBarActive
                onClick={() => {
                  changeNumber(1);
                }}
                active
              >
                요약
              </ServerSubNavBarActive>
            </div>
          ) : (
            <div>
              <ServerSubNavBar
                onClick={() => {
                  changeNumber(1);
                }}
                to="/serversummary"
              >
                {" "}
                요약
              </ServerSubNavBar>
            </div>
          )}
        </NavItem>

        <NavItem>
          {navBar.submenuCheck === 4 ? (
            <div>
              <ServerSubNavBarActive
                onClick={() => {
                  changeNumber(4);
                }}
                active
              >
                메모리
              </ServerSubNavBarActive>
            </div>
          ) : (
            <div>
              <ServerSubNavBar
                onClick={() => {
                  changeNumber(4);
                }}
                to="/servermemory"
              >
                {" "}
                메모리
              </ServerSubNavBar>
            </div>
          )}
        </NavItem>
        <NavItem>
          {navBar.submenuCheck === 5 ? (
            <div>
              <ServerSubNavBarActive
                onClick={() => {
                  changeNumber(5);
                }}
                active
              >
                저장장치
              </ServerSubNavBarActive>
            </div>
          ) : (
            <div>
              <ServerSubNavBar
                onClick={() => {
                  changeNumber(5);
                }}
                to="/serverstorage"
              >
                저장장치
              </ServerSubNavBar>
            </div>
          )}
        </NavItem>
        <NavItem>
          {navBar.submenuCheck === 7 ? (
            <div>
              <ServerSubNavBarActive
                onClick={() => {
                  changeNumber(7);
                }}
                active
              >
                이슈알림
              </ServerSubNavBarActive>
            </div>
          ) : (
            <div>
              <ServerSubNavBar
                to="/serverissue"
                onClick={() => {
                  changeNumber(7);
                }}
              >
                {" "}
                이슈알림
              </ServerSubNavBar>
            </div>
          )}
        </NavItem>
      </ServerItemNavBar>
    </div>
  );
});

export default subNavBar;
