import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';
import NavbarHeaderBank from './NavbarHeaderBank';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
  
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
  button{
    margin:0.5rem;
  }
`;



const styles = { 
  h3:{
    textAlign:'center'
   }
};

function AddClient(){
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState(0);

  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState("First name cannot be empty");
  const [lastNameError, setLastNameError] = useState("Last name cannot be empty");
  const [formValid, setFormValid] = useState(false);

  const firstNameHandler = (e) => {   
    setFirstName(e.target.value);
    if (!e.target.value)
    {
      setFirstNameError('Not correct first name');
    }
    else {
      setFirstNameError('');
    }
  }

  const lastNameHandler = (e) => {   
    setLastName(e.target.value);
    if (!e.target.value)
    {
      setLastNameError('Not correct last name');
    }
    else {
      setLastNameError('');
    }
  }

  useEffect( () => {
      if(firstNameError || lastNameError){
        setFormValid(false)
      }
      else
      {
        setFormValid(true)
      }
    },
    [firstNameError, lastNameError]
  )
 
  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'firstName':
        setFirstNameDirty(true)
        break
      case 'lastName':
        setLastNameDirty(true) 
        break 
        default:break;
      }
  }  

  async function addClientClick(){
    var client = {
      id: await clientsRepository.generateClientId(),
      firstName: firstName,
      lastName:lastName,
      balance: balance
    };   
    await clientsRepository.addClient(client);

    const message = `New client ${firstName} ${lastName} with balance $${(balance).toFixed(2)} has been successfully added`;
    alert(message);

    var operationId = await operationsRepository.generateOperationId();
    await operationsRepository.createOperation(
      {
        id: operationId,
        date: new Date().toUTCString(),
        text: message
      });
    
    handleReset();
  }  

   function handleReset() {    
    setFirstName('');
    setLastName('');
    setBalance(0); 
  }

  return (
    <div>
      <NavbarHeaderBank />
      <h3 style={styles.h3}>Create new client</h3>
      <div>
        <Wrapper>
          <label htmlFor="firstName">Input First Name:</label>
            {(firstNameDirty && firstNameError) && <div style={{color:'red'}}>{firstNameError}</div>}
            <input
              autoFocus
              required
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="First name"
              onBlur={blurHandler}
              onChange={firstNameHandler}
            />
            <label htmlFor="lastName">Input Last Name:</label>
            {(lastNameDirty && lastNameError) && <div style={{color:'red'}}>{lastNameError}</div>}
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Last name"
              onBlur={e => blurHandler(e)}
              onChange={(e) => lastNameHandler(e)}
            />    
            <label htmlFor="balance">Input Balance:</label>
            <input
              required
              type="number"
              id="balance"
              name="balance"
              value={balance}
              placeholder="Balance"
              min="0"
              onChange={event => setBalance(+event.target.value)}                 
            />
            <div>
              <button className="btn btn-secondary" onClick={handleReset}>Clear</button>
              <button className="btn btn-primary" onClick={addClientClick} disabled={!formValid}>Add new client</button>
            </div>          
        </Wrapper>
        </div> 
      </div>     
  )
}

export default AddClient
 