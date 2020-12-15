import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BankArea from './components/BankArea';
import ClientArea from './components/ClientArea';
import ExchangeRate from './components/ExchangeRate';
import { NavbarHeader } from './components/NavbarHeader';

function App() {
    
  return (
    <BrowserRouter>          
       <NavbarHeader />
       <div className="container pt-4">
        <Switch>
          <Route path={'/'} exact component={BankArea} />
          <Route path={'/clients'}  component={ClientArea}/> 
          <Route path={'/currency-rate'}  component={ExchangeRate}/>         
        </Switch>       
      </div>
    </BrowserRouter>    
  );
}

export default App;
