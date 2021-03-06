import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
}

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue); 
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  };
}

const Withdraw = (props) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState();

  useEffect( () => {
    async function fetchData(){
      const c = await clientsRepository.getClients();
      setClients(c);   
    }
    fetchData();       
  }, []);

  const balance = useInputValue('')
 
  async function makeWithdrawal() {
    const client = await clientsRepository.getClient(selectedClient.id);
    client.balance = client.balance - balance.value();
    clientsRepository.updateClient(client);
    
    const message = `Payment has been withdrawn from the ${client.firstName} ${client.lastName}.`;
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
    setSelectedClient(null);
    balance.clear();
  }

  function onClientChange(selectedClient){
    setSelectedClient(selectedClient);
  }

  function getBalance() {
    if (selectedClient) {
      return <span>{selectedClient.balance - balance.value()}</span>
    }
  }

  return (
    <div>
      <NavbarHeaderBank />
      <h3 style={styles.h3}>Withdraw operation</h3>
          <div >
            <Wrapper>
              <label>Clients List</label>
              <Select 
                placeholder="Select client"
                options={clients}
                getOptionLabel={client => `${client.firstName} ${client.lastName}` }
                getOptionValue={client => client.id}
                onChange = {onClientChange}
                value={selectedClient}
                isClearable={true}                    
              /> 
              <label htmlFor="balance">Enter the amount to be removed:</label>
              <input
                required
                type="number"
                id="balance"
                min="0"
                name="balance"
                placeholder="balance"
                {...balance.bind}
              />  
              <p>Balance after operation will be {getBalance()}</p>

              <div>
                <button className="btn btn-secondary" onClick={handleReset}>Clear</button>
                <button className="btn btn-primary"  onClick={makeWithdrawal}>Withdraw</button>
              </div>
            </Wrapper>            
          </div> 
        </div>
    
  )
}

export default Withdraw
