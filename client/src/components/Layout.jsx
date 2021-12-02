import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import {
  AppWrapper,
  StyledContainer,
  StyledNavbar,
  StyledNavbarBrand,
  StyledNavbarToggle,
  StyledNavDropdown,
  StyledNavDropdownItem,
  StyledNavLink,
} from '../styles.js';

const Layout = () => (
  <AppWrapper>
    <StyledNavbar collapseOnSelect expand="lg">
      <StyledContainer class="container-fluid" nav-fill w-100>
        <StyledNavbarBrand href="/">Heirographa</StyledNavbarBrand>
        <StyledNavbarToggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <StyledNavLink href="/">Home</StyledNavLink>
            <StyledNavLink href="/workspace">Workspace</StyledNavLink>
            <StyledNavDropdown title="Help" id="collapsible-nav-dropdown">
              <StyledNavDropdownItem href="/guide">Guide</StyledNavDropdownItem>
              <NavDropdown.Divider />
              <StyledNavDropdownItem href="/glossary">Glossary</StyledNavDropdownItem>
            </StyledNavDropdown>
            <StyledNavLink href="/about">About</StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </StyledContainer>
    </StyledNavbar>
    <Outlet />
  </AppWrapper>
);

export default Layout;
