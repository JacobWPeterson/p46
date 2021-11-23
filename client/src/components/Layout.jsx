import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import {
  AppWrapper,
  StyledH1,
  StyledNav,
  StyledNavDropdown,
  StyledNavDropdownItem,
  StyledNavItem,
  StyledNavItemsContainer,
  StyledNavLink,
} from '../styles.js';

const Layout = () => (
  <AppWrapper>
    <StyledNav activeKey="1">
      <StyledH1>
        <a href="/">
          Transcribe
        </a>
      </StyledH1>
      <StyledNavItemsContainer>
        <StyledNavItem>
          <StyledNavLink eventKey="1" to="/">Home</StyledNavLink>
        </StyledNavItem>
        <StyledNavItem>
          <StyledNavLink eventKey="2" to="/workspace">Workspace</StyledNavLink>
        </StyledNavItem>
        <StyledNavDropdown title="Help" data-test="nav-dropdown">
          <StyledNavDropdownItem eventKey="3.1" href="/help">Guide</StyledNavDropdownItem>
          <NavDropdown.Divider />
          <StyledNavDropdownItem eventKey="3.2" href="/help#glossary">Glossary</StyledNavDropdownItem>
        </StyledNavDropdown>
        <StyledNavItem>
          <StyledNavLink eventKey="4" to="/about">About</StyledNavLink>
        </StyledNavItem>
      </StyledNavItemsContainer>
    </StyledNav>
    <Outlet />
  </AppWrapper>
);

export default Layout;
