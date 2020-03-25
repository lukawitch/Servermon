import styled from "styled-components";
import { Link } from "react-router-dom";
import { Nav, NavLink } from "reactstrap";

export const ServerItemLinkText = styled(Link)`
  color: #0a0c52;
  font-size: 13pt;
  &:hover {
    color: black;
    text-decoration: none !important;
  }
`;

export const ServerListPageLogo = styled.h1`
  text-align: center;
`;

export const ServerItemNavBar = styled(Nav)`
  display: flex;
  justify-content: space-around;
  color: black;
`;

export const ServerSubNavBarActive = styled(NavLink)`
  color: #0a0c52;
  font-size: 13pt;
`;

export const ServerSubNavBar = styled(Link)`
  color: #0a0c52;
  font-size: 13pt;
  :hover {
    text-decoration: none;
    color: #5da68e;
  }
`;

export const ServerLoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;

export const ServerListPosition = styled.div`
  margin-top: 4%;
`;
