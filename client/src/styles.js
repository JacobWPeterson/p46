import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

export const AppWrapper = styled.div`
  font-family: 'Noto Sans', sans-serif;
`;

export const MiradorWrapper = styled.div`
  flex: 3;
  height: 100%;
  position: relative;
`;

export const PageWrapper = styled.div`
  height: 85vh;
  width: 98vw;
  display: flex;
`;

export const TranscriptionContainer = styled.div`
  flex: 2;
  display: flex;
  border: 2xp solid #3D3D3D;
`;

export const StyledH1 = styled.h1`
  color: #c9ac5f;
  font-size: 40px;
  font-weight: 700;
  font-style: italic;
  letter-spacing: .2rem;
  margin: 0;
`;

export const StyledNav = styled(Nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background: #3e5276;
  color: #fff;
  padding: 0 50px;
`;

export const StyledNavItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20vw;
  height: 100%;
`;

export const StyledNavItem = styled(Nav.Item)`
  padding: 0 20px;
`;

export const StyledNavLink = styled(Link)`
  color: #fff;
  font-size: 18px;
  text-decoration: none;

  &:hover, &:focus {
    cursor: pointer;
    color: #c9ac5f;
  }
  &:hover {
    transition: 500ms ease;
  }

`;