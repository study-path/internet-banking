import React from 'react';

import BankArea from './components/BankArea';
import ClientArea from './components/ClientArea';

function App() {

  return (
    <div className="container">
      <h1>Mobile-Banking</h1>
      <div className='areas'>
        <BankArea />
        <ClientArea />
      </div>
     
    </div>
  );
}

export default App;
