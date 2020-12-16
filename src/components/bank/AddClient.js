import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';

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

function useInputValue(defaultValue = null) {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(null),
    value: () => value
  }  
}

function AddClient(){
  const firstName = useInputValue('');
  const lastName = useInputValue('');
  const balance = useInputValue(0);  

  async function addClientClick(){     
    var client = {
      id: await clientsRepository.generateClientId(),
      firstName: firstName.value(),
      lastName: lastName.value(),
      balance: +balance.value(),
    };   
    clientsRepository.addClient(client); 
  }  

  function closeForm() {
    firstName.clear();
    lastName.clear();
    balance.clear();    
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
                {...firstName.bind}
              />
              <label htmlFor="lastName">Last Name:</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="lastName"
                {...lastName.bind}
              />    
              <label htmlFor="balance">Balance:</label>
              <input
                required
                type="number"
                id="balance"
                name="balance"
                placeholder="balance"
                {...balance.bind}                  
              />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeForm}>Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addClientClick}>Add new client</button>
              </div>
            </Form>            
        </Wrapper>
      </div>     
  )
}

export default AddClient
 