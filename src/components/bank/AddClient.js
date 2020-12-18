import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  // margin: 0 auto;
  
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;



function AddClient(){
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState(0);

  
  async function addClientClick(){   
   
    var client = {
      id: await clientsRepository.generateClientId(),
      firstName: firstName,
      lastName:lastName,
      balance: balance
    };   
    await clientsRepository.addClient(client); 
    alert("Client was added");  
    var operationId = await operationsRepository.generateOperationId();
    await operationsRepository.createOperation({id:operationId, date:new Date().toUTCString(), text:`New client ${firstName} ${lastName} was added`});
    
    handleReset();
  }  

   function handleReset() {    
    setFirstName('');
    setLastName('');
    setBalance(0); 
  }

  return (
    <div>
      <div>Add client</div>
        <Wrapper>
          <h3 className="modal-header">Create New Client </h3>
            <Form >
              <label htmlFor="firstName">First Name:</label>
              <input
                autoFocus
                required
                type="text"
                id="firstName"
                name="firstName"
                placeholder="firstName"
                onChange={event => setFirstName(event.target.value)}
              />
              <label htmlFor="lastName">Last Name:</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="lastName"
                onChange={event => setLastName(event.target.value)}
              />    
              <label htmlFor="balance">Balance:</label>
              <input
                required
                type="number"
                id="balance"
                name="balance"
                placeholder="balance"
                onChange={event => setBalance(+event.target.value)}                 
              />
              <div className="modal-footer">
                <button  className="btn btn-secondary" type="reset" defaultValue="Reset" onClick={handleReset}>Clear</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addClientClick}>Add new client</button>
              </div>
            </Form>            
        </Wrapper>
       
      </div>     
  )
}

export default AddClient
 