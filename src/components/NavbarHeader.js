import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #EF00CF;
  }
`;

export const NavbarHeader = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="navbarHeader-brand">
      <h1>Internet Banking</h1>
      <dl className="navbar">
        <dt className="nav-item">
          <StyledLink className="nav-link" to="/" exact>Bank</StyledLink>
        </dt>
        <dt className="nav-item">
          <StyledLink className="nav-link" to="/clients">Clients</StyledLink>
        </dt>        
      </dl>
    </div>
    <div>
    <StyledLink className="nav-link" to="/bank/dashboard" exact>Dashboard</StyledLink>
    <StyledLink className="nav-link" to="/bank/add-client" exact>Add Client</StyledLink>
    <StyledLink className="nav-link" to="/bank/do-deposit" exact>Do Deposite</StyledLink> 
    <StyledLink className="nav-link" to="/bank/withdraw/" exact>Withdraw</StyledLink>

    </div>
  </nav>
  )

  export default NavbarHeader

