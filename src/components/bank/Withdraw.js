import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em; 
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
  const [selectedClientId, setSelectedClientId] = useState(); 
  const [selectedClientFullname, setSelectedClientFullName] = useState();
  const [selectedClientBalance, setSelectedClientBalance] = useState();
  const [futureBalance, setFutureBalance] = useState();

  useEffect( () => {
    async function fetchData(){
      const c = await clientsRepository.getClients();
      setClients(c);   
    }
    fetchData();       
  }, []);

  const balance = useInputValue('')
 
  async function makeWithdrawal() {
    var client = await clientsRepository.getClient(selectedClientId);
    client.balance = client.balance - balance.value();
    clientsRepository.updateClient(client);
    var operationId = await operationsRepository.generateOperationId();
    await operationsRepository.createOperation({id:operationId, date:new Date().toUTCString(), text:`Client ${client.firstName} ${client.lastName} decrease balance `});
    handleReset();
  }  

  function handleReset() {
    balance.clear();
  }

  function onClientChange(selectedClient){
    setSelectedClientId(selectedClient.id);
    setSelectedClientFullName(`${selectedClient.firstName} ${selectedClient.lastName}`);  
    setSelectedClientBalance(selectedClient.balance);
  }

  return (
    <div>
      <div>Withdraw operation</div>
          <div className="modal-content">
            <Wrapper>
              <div>Withdraw money with {selectedClientFullname}</div>
              <div className="modal-header">Clients List</div>
                <Form >
                  <Select 
                    placeholder="Select client"
                    options={clients}
                    getOptionLabel={client => `${client.firstName} ${client.lastName}` }
                    getOptionValue={client => client.id}
                    onChange = {onClientChange} 
                    isClearable={true}                    
                  />                
                  <label htmlFor="balance">Balance:</label>
                  <input
                    required
                    type="number"
                    id="balance"
                    min="0"
                    name="balance"
                    placeholder="balance"
                    {...balance.bind}
                  />
                  <p>
                    Balance after operation will = {selectedClientBalance - balance.value()}
                  </p>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleReset}>Clear</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={makeWithdrawal}>Withdraw</button>
                  </div>                  
                </Form>            
            </Wrapper>
          </div> 
        </div>
    
  )
}

export default Withdraw
