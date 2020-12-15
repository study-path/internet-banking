import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(null),
    value: () => value
  }  
}

function AddClient(props){
  const firstName = useInputValue('');
  const lastName = useInputValue('');
  const balance = useInputValue(0);
  const phone = useInputValue('');
  const numberHouse = useInputValue('') ; 
  const streetName = useInputValue('');
  const unit = useInputValue('');
  const age = useInputValue('');

  function addClientClick(e){  
    props.addClientCallBack({
      firstName: firstName.value(),
      lastName: lastName.value(),
      balance: +balance.value(),
      phone: phone.value(),
      streetName: streetName.value(),
      numberHouse: numberHouse.value(),
      unit: unit.value(),
      age: age.value()
    });    
    closeModalWindow();   
  }  

  function closeModalWindow() {
    firstName.clear();
    lastName.clear();
    balance.clear();
    phone.clear();
    numberHouse.clear();
    streetName.clear();
    unit.clear();
    age.clear();
  }

  return (
    <div>
      <button className="btn btn-success" data-toggle="modal" data-target="#addClientDialog">Add client</button>
      <div className="modal fade" id="addClientDialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <Wrapper>
              <div className="modal-header">New Client Information</div>
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
                  <label htmlFor="phone">Phone:</label>
                  <input
                    required
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="phone"
                    {...phone.bind}                  
                  />
                  <label htmlFor="numberHouse">Number House:</label>
                  <input
                    autoFocus
                    required
                    type="number"
                    id="numberHouse"
                    name="numberHouse"
                    placeholder="numberHouse"
                    {...numberHouse.bind}
                  />
                  <label htmlFor="streetName">Street Name:</label>
                  <input
                    autoFocus
                    required
                    type="text"
                    id="streetName"
                    name="streetName"
                    placeholder="streetName"
                    {...streetName.bind}
                  />
                  <label htmlFor="unit">Unit:</label>
                  <input
                    autoFocus
                    required
                    type="number"
                    id="unit"
                    name="unit"
                    placeholder="unit"
                    {...unit.bind}
                  />
                  <label htmlFor="age">Age:</label>
                  <input
                    autoFocus
                    required
                    type="number"
                    id="age"
                    name="age"
                    placeholder="age"
                    {...age.bind}
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
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModalWindow}>Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addClientClick}>Add new client</button>
                  </div>
                </Form>            
              </Wrapper>
            </div> 
        </div>
      </div>
    </div> 
  )
}

export default AddClient
 