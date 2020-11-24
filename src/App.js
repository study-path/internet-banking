import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BankArea from './components/BankArea';
import ClientArea from './components/ClientArea';
import { NavbarHeader } from './components/NavbarHeader';

function App() {

  return (
    <BrowserRouter>          
       <NavbarHeader />
       <div className="container pt-4">
        <Switch>
          <Route path={'/'} exact component={BankArea} />
          <Route path={'/clientArea'} exact component={ClientArea}/>         
        </Switch>       
      </div>
    </BrowserRouter>    
  );
}

export default App;
