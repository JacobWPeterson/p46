import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { AppWrapper, StyledH1, StyledNav, StyledNavItem, StyledNavItemsContainer, StyledNavLink } from '../styles.js';

const Layout = () => (
  <AppWrapper>
    <StyledNav>
      <StyledH1>
        Transcribe
      </StyledH1>
      <StyledNavItemsContainer>
        <StyledNavItem>
          <StyledNavLink to="/">Home</StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink to="/workspace">Workspace</StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink to="/guide">Guide</StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink to="/about">About</StyledNavLink>
        </StyledNavItem>
      </StyledNavItemsContainer>
    </StyledNav>
    <Outlet />
  </AppWrapper>
);

export default Layout;
