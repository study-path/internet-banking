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


const styles = { 
  h3:{
    textAlign:'center'
   }
}

function useNumberInputValue(defaultValue = 0) {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: event => setValue(+event.target.value)
    },
    clear: () => setValue(0),
    value: () => value
  }  
}
function Deposit(props){  
  const [clients, setClients] = useState([]); 
  const [selectedClient, setSelectedClient] = useState();

  useEffect( () => { 
    async function fetchData(){     
      const c = await clientsRepository.getClients();   
      setClients(c);
    } 
    fetchData();    
  }, []);
  
  const balance =  useNumberInputValue();

  async function depositPayment(e){    
    const client = await clientsRepository.getClient(selectedClient.id);
    client.balance = client.balance +  +balance.value();
    clientsRepository.updateClient(client);

    const message = `Payment $${balance.value().toFixed(2)} has been deposited to the ${client.firstName} ${client.lastName}.`;
    alert(message);

    const operationId = await operationsRepository.generateOperationId();    
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
      return <span>${(selectedClient.balance + +balance.value()).toFixed(2)}</span>;
    }
  }

  return (
    <>  
      <NavbarHeaderBank />    
      <h3 style={styles.h3}>Deposit operation</h3> 
      <div>
        <Wrapper>            
          <Form>
            <label>Clients List</label>
              <Select 
                options={clients}
                getOptionLabel={client => `${client.firstName} ${client.lastName}` }
                getOptionValue={client => client.id}
                onChange = {onClientChange}
                value={selectedClient}
              />                           
            <label htmlFor="balance">Balance:</label>
            <input
                required
                type="number"
                id="balance"
                name="balance"
                min="0"
                placeholder="balance"
                {...balance.bind}
              />
              <p>Balance after operation will be {getBalance()}</p>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleReset}>Clear</button>
              <button type="button" className="btn btn-primary" onClick={depositPayment}>Deposit</button>
            </div>                  
            </Form >            
        </Wrapper>
      </div>
    </>
  )
}

export default Deposit
 