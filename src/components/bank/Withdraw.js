import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';

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

  useEffect( async () => {    
    const c = await clientsRepository.getClients();
    setClients(c);     
  }, []);

  const balance = useInputValue('')
 
  async function makeWithdrawal() {
    var client = await clientsRepository.getClient(selectedClientId);
    client.balance = client.balance - balance.value();
    clientsRepository.updateClient(client);
    closeModalWindow();
  }  

  function closeModalWindow() {
    balance.clear();
  }

  function onClientChange(selectedClient){
    setSelectedClientId(selectedClient.id);
    setSelectedClientFullName(`${selectedClient.firstName} ${selectedClient.lastName}`);  
    setSelectedClientBalance(selectedClient.balance);
  }

  return (
    <div>
      <button className="btn btn-success" data-toggle="modal" data-target="#addWithdrawDialog">Withdraw</button>     
      <div className="modal fade" id="addWithdrawDialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
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
                    name="balance"
                    placeholder="balance"
                    {...balance.bind}
                  />
                  <p>
                    Balance after operation will = {selectedClientBalance - balance.value()}
                  </p>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModalWindow}>Exit</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={makeWithdrawal}>Save</button>
                  </div>                  
                </Form>            
            </Wrapper>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Withdraw
