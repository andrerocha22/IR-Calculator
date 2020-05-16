import React, { useState } from "react";
import styled from "styled-components";
import logo_calc from "../../assets/logo_calculator.svg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const StyledNavbarBrand = styled.div`
  padding-top: 13px;
  padding-bottom: 13px;
`;

const LogoImg = styled.img`
  height: 3rem;
  @media (max-width: 991px) {
    height: 2rem;
  }
`;

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <StyledNavbarBrand>
            {<LogoImg src={logo_calc} alt="logo" />}
          </StyledNavbarBrand>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Minha conta</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Ajuda</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
