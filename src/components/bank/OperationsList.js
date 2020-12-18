import React, { useEffect, useState } from 'react';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';


const OperationsList = () => {

  const [operations, setOperations] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect( () => { 
    async function fetchData(){
      alert('useEffectOperations') ; 
      const clients = await clientsRepository.getClients();
      const operations = await operationsRepository.getOperations(); 
      operations.reverse(); 
      setClients(clients);
      setOperations(operations);
    } 
    fetchData();
  }, []);
 
  return (
    <div>
       <h1>This is dashboard component </h1>
      <table >
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>List of operations</th>         
          </tr>
        </thead>
        <tbody>
          {operations.map( (operation) => {
            return (
              <tr key={operation.id}>
                <td>{operation.id}</td>
                <td>{operation.date}</td>
                <td>{operation.text}</td>        
              </tr>
              )
            })
          }
        </tbody>  
      </table>  
      <div>Number of clients : {clients.length}</div>
    </div>
  )
}

export default OperationsList
