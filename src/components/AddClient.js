import React, { useEffect, useState } from 'react';

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
  const nameInput = useInputValue('')
  const balanceInput = useInputValue('')

  function addClientClick(e){
      props.addClient({
      name: nameInput.value(),
      balance: balanceInput.value()
    })
  }  
  return (
    <div>
        <button type="submit" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Add client</button>

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              Add New Client
              </div>
              <div className="modal-body">
                <input {...nameInput.bind} ></input>
                <input {...balanceInput.bind} ></input>
               <h1>
               {nameInput.value}
               </h1>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" 
                  onClick={() => {
                    nameInput.clear(); 
                    balanceInput.clear()
                    }}
                >Close</button>
                <button type="button" className="btn btn-primary" onClick={addClientClick}>Add new client</button>
              </div>
            </div>
          </div>
        </div>

      </div> 
  )
}


export default AddClient
 