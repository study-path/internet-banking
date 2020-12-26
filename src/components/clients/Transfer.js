import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';

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

function Transfer(props){  
  const [clients, setClients] = useState([]); 
  const [selectedClient, setSelectedClient] = useState();

  useEffect( () => { 
    async function fetchData(){     
      let clients = await clientsRepository.getClients();
      clients = clients.filter(c => c.id != props.match.params.clientId);
      setClients(clients);
    } 
    fetchData();    
  }, []);
  
  const balance = useNumberInputValue();

  async function transferPayment(e){    
    const clientTo = await clientsRepository.getClient(selectedClient.id);
    clientTo.balance = clientTo.balance +  +balance.value();
    clientsRepository.updateClient(clientTo);

    const clientFrom = await clientsRepository.getClient(props.match.params.clientId);
    clientFrom.balance = clientFrom.balance - balance.value(); // some logic should be applied if transcfer can be performed
    clientsRepository.updateClient(clientFrom);

    const message = `Transfer $${balance.value().toFixed(2)} has been performed to the ${clientTo.firstName} ${clientTo.lastName} from the ${clientFrom.firstName} ${clientFrom.lastName}.`;
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

  return (
    <>
      <h3 style={styles.h3}>Transfer payment</h3> 
      <div>
        <Wrapper>
          <label>Clients List</label>
            <Select 
              options={clients}
              getOptionLabel={client => `${client.firstName} ${client.lastName}` }
              getOptionValue={client => client.id}
              onChange = {onClientChange}
              value={selectedClient}
            />                           
          <label htmlFor="balance">Amount:</label>
          <input
              required
              type="number"
              id="balance"
              name="balance"
              min="0"
              placeholder="balance"
              {...balance.bind}
            />
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Clear</button>
            <button type="button" className="btn btn-primary" onClick={transferPayment}>Transfer</button>
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default Transfer;
 