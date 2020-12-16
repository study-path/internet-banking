import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavbarHeader = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="navbarHeader-brand">
      <h1>Internet Banking</h1>
      <dl className="navbar">
        <dt className="nav-item">
          <NavLink className="nav-link" to="/" exact>Bank</NavLink>
        </dt>
        <dt className="nav-item">
          <NavLink className="nav-link" to="/clients">Clients</NavLink>
        </dt>        
      </dl>
    </div>
    <div>
    <NavLink className="nav-link" to="/bank/dashboard" exact>Dashboard</NavLink>
    <NavLink className="nav-link" to="/bank/add-client" exact>Add Client</NavLink>
    <NavLink className="nav-link" to="/bank/do-deposit" exact>Do Deposite</NavLink> 
    <NavLink className="nav-link" to="/bank/withdraw/" exact>Withdraw</NavLink>

    </div>
  </nav>
  )

  export default NavbarHeader

