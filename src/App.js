import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AddClient from './components/bank/AddClient';
import Dashboard from './components/bank/Dashboard';
import Deposit from './components/bank/Deposit';
import Withdraw from './components/bank/Withdraw';
import Client from './components/clients/Client';
import Clients from './components/clients/Clients';
import Transfer from './components/clients/Transfer';
import ExchangeRate from './components/ExchangeRate';
import NavbarHeader from './components/NavbarHeader';

function App() {
    
  return (
    <div>
      <BrowserRouter>
        <NavbarHeader />
        <div className="container pt-4">
          <Switch>
            <Redirect exact  from="/" to='/bank' />
            <Redirect exact  from="/bank" to='/bank/dashboard' />
            <Route path={'/bank/dashboard'} component={Dashboard} />
            <Route path={'/bank/add-client'} component={AddClient} />
            <Route path={'/bank/deposit'} component={Deposit} />
            <Route path={'/bank/withdraw'} component={Withdraw} />
            <Route path={'/clients'} exact component={Clients} />
            <Route path={'/clients/:clientId'} exact component={Client} />
            <Route path={'/clients/:clientId/transfer'}  component={Transfer} />
            <Route path={'/exchange-rate'} component={ExchangeRate} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;