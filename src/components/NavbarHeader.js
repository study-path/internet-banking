import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #EF00CF;
    border: 1px solid #6d98a5;
    border-radius: 5px;
    background-color: #00bcd4;
    width: 150px;
  }  
`;

export const NavbarHeader = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="navbarHeader-brand">
      <h1>Internet Banking</h1>
      <dl className="navbar">     
        <dt className="nav-item">
          <StyledLink className="nav-link" to="/bank">Bank</StyledLink>
        </dt>
        <dt className="nav-item">
          <StyledLink className="nav-link" to="/clients">Clients</StyledLink>
        </dt>      
         <dt className="nav-item">
          <StyledLink className="nav-link" to="/exchange-rate">Exchange Rate</StyledLink>
        </dt>       
      </dl>
    </div>
    
  </nav>
  )

  export default NavbarHeader

  