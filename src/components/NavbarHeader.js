import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavbarHeader = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="navbarHeader-brand">
      <h1>Internet Banking</h1>
      <dl className="navbar">
        <dt className="nav-item">
          <NavLink className="nav-link" to="/" exact>BankArea </NavLink>
        </dt>
        <dt className="nav-item">
          <NavLink className="nav-link" to="/clients">ClientArea</NavLink>
        </dt>  
        <dt className="nav-item">
          <NavLink className="nav-link" to="/currency-rate">ExchangeRate</NavLink>
        </dt>         
      </dl>
    </div>
  </nav>
  )

