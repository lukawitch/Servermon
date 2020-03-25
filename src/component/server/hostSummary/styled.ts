import styled from "styled-components";
import { NavItem, Nav } from "reactstrap";

export const ServerHostItemIP = styled.div`
  text-align: center;
  font-size: 20pt;
  font-weight: 300;
  margin-bottom:2%
  margin-top:2%
`;

export const ServerHostItem = styled(NavItem)`
  color: #0a0c52;
  font-weight: 300;
  font-size: 15pt;
  text-decoration: none;
`;

export const ServerSummaryPagePosition = styled.div`
  margin-top: 5%;
`;

export const ServerSummaryPageDescription = styled.h3`
  text-align: center;
  font-weight: 300;
`;

export const ServerNavBarItem = styled(Nav)`
  display: flex;
  justify-content: space-around;
  color: black;
`;

export const ServerHostSummaryText = styled.span`
  margin-right: 2%;
`;
