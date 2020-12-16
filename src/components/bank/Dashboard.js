import React, { useState } from 'react';

const Dashboard = () => {
    
  function renderTitle() {
    return (
      <>
        <h1>this is dashboard component </h1>
      </>);
  }
  

  const [firstName, setFirstName] = useState();
  var [lastName, setLastName] = useState();
  const [balance, setBalance] = useState();



  function lskdjf_setFirstName(eee) {
    setFirstName(eee.target.value);
  }

  return (
    <div>
      {renderTitle()}
      <input type="text" className="i-1" onChange={lskdjf_setFirstName} />
      <input type="text"className="i-2" onChange={event => setLastName(event.target.value)}></input>      
      <input type="text" id="i-3" onChange={event => setBalance(event.target.value)}></input>
  <p>{firstName}</p>
  <p>{lastName}</p>
  <p>{balance}</p>
    </div>    
  )
}

export default Dashboard
