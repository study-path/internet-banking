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


function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }  
}

function AddClient(props){
  const firstName = useInputValue('')
  const lastName = useInputValue('')  
  const balance = useInputValue('')

  function addClientClick(e){
      props.addClientCallBack({
      firstName: firstName.value(),
      lastName: lastName.value(),
      balance: balance.value()
    })
    
  }  
  return (
    <div>
      <button type="submit" className="btn btn-success" data-toggle="modal" data-target="#addClientDialog">Add client</button>
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
                      // onChange={handleChange}
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
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" 
                        onClick={() => {
                          firstName.clear(); 
                          lastName.clear();
                          balance.clear()
                          }}
                      >Close</button>
                      <button type="button" className="btn btn-primary" onClick={addClientClick}>Add new client</button>
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
 