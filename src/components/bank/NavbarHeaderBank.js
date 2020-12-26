import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #EF00CF;
  }
`;

const NavbarHeaderBank = () => {
  return (
    <div>
       <nav className="navbar navbar-light bg-light">
         <div className="navbarHeader-brand">
          <dl className="navbar">
            <dt className="nav-item">
              <StyledLink className="nav-link" to="/bank/dashboard" exact>Dashboard</StyledLink>
            </dt>  
            <dt className="nav-item">
              <StyledLink className="nav-link" to="/bank/add-client" exact>Add Client</StyledLink>
            </dt>
            <dt>
              <StyledLink className="nav-link" to="/bank/deposit" exact>Deposite</StyledLink> 
            </dt>
            <dt>
              <StyledLink className="nav-link" to="/bank/withdraw/" exact>Withdraw</StyledLink>
            </dt>  
          </dl>
        </div> 
        </nav>
    </div>
  )
}

export default NavbarHeaderBank
