import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AddClient from './components/bank/AddClient';
import Dashboard from './components/bank/Dashboard';
import DoDeposit from './components/bank/DoDeposit';
import Withdraw from './components/bank/Withdraw';
import NavbarHeader from './components/NavbarHeader';

function App() {
    
  return (
    <div>
      <BrowserRouter>
        <NavbarHeader />
        <div className="container pt-4">
          <Switch>
            <Redirect exact  from="/" to='/bank/dashboard' /> 
            <Route path={'/bank/dashboard'} component={Dashboard} />
            <Route path={'/bank/add-client'} component={AddClient} />
            <Route path={'/bank/do-deposit'} component={DoDeposit} />
            <Route path={'/bank/withdraw'} component={Withdraw} />
          </Switch>       
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;