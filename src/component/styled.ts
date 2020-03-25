import styled from "styled-components";
import { NavbarBrand, Nav, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

export const TopNavbarHomePosition = styled(NavbarBrand)`
  width: 90%;
`;
export const TopNavbarHomePositionMoblie = styled(NavbarBrand)`
  width: 80%;
`;

export const TopNavBarItemPosition = styled(Nav)`
  display: flex;
  justify-content: space-around;
  color: black;
`;

export const HomePageLogo = styled.h1`
  text-align: center;
`;

export const TopNavBarItemText = styled(Link)`
  color: #0a0c52;
  font-size: 13pt;
  &:hover {
    color: black;
    text-decoration: none !important;
  }
`;

export const TopNavBarTitleLogo = styled.span`
  font-size: 40pt;
  margin-left: 10%;
`;

export const TopNavBarTitleLogoMoblie = styled.span`
  font-size: 40pt;
`;

export const TopNavBarPosition = styled.div`
  width: 100%;
  padding-top: 2%;
`;

export const NoDeviceNotice = styled.span`
  display: flex;
  justify-content: center;
`;

export const HeaderFont = styled(CardHeader)`
  font-size: 15pt;
  text-align: center;
`;

export const LinkFont = styled(Link)`
  text-decoration: none !important;
  color: black;
  &:hover {
    color: black;
  }
`;

export const HomeTitlePosition = styled.div`
  display: flex;
  justify-content: center;
`;

export const TopMenuBarSelectNavItemText = styled.span`
  color: #138496;
  font-weight: 700;
  font-size: 15pt;
`;

export const TopMenuBarItemLineSetting = styled.hr`
  border: 0;
  height: 3px;
  background: #138496;
  margin-top: 0;
  margin-bottom: 0;
`;
