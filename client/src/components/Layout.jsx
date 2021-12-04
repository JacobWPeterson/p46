import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import ContactModal from './ContactModal.jsx';
import {
  AppWrapper,
  Copyright,
  StyledContainer,
  StyledFooter,
  StyledNavbar,
  StyledNavbarBrand,
  StyledNavbarToggle,
  StyledNavDropdown,
  StyledNavDropdownItem,
  StyledNavLink,
} from '../styles.js';

const Layout = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleOpenContactModal = () => setModalShow(!modalShow);

  return (
    <AppWrapper>
      <StyledNavbar bordertop="5px solid #c9ac5f" collapseOnSelect expand="lg">
        <StyledContainer className="container-fluid" nav-fill w-100>
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
      <StyledFooter>
        <Copyright>
          © 2022 Jacob W. Peterson
        </Copyright>
        |
        {' '}
        <StyledNavLink
          color="#3e5276"
          role="link"
          tabIndex={0}
          onClick={() => handleOpenContactModal()}
          onKeyPress={() => handleOpenContactModal()}
        >
          Contact
        </StyledNavLink>
      </StyledFooter>
      <ContactModal onHide={() => handleOpenContactModal()} show={modalShow} />
    </AppWrapper>
  );
};

export default Layout;
