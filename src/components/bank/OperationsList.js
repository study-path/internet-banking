import React, { useEffect, useState } from 'react';

import { clientsRepository } from '../../firebase/clientsRepository';
import { operationsRepository } from '../../firebase/operationsRepository';

const styles = { 
  date:{
    width:'300px'
   }
}
const OperationsList = () => {

  const [operations, setOperations] = useState([]);
  const [clients, setClients] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect( () => {     
    async function fetchData(){
      const clients = await clientsRepository.getClients();
      const operations = await operationsRepository.getOperations(); 
      operations.reverse(); 
      setClients(clients);
      setOperations(operations);
      let tb = 0;
      clients.forEach( (client) => {tb = tb + client.balance});
      setTotalBalance(tb);
    } 
    fetchData();
  }, []);
 

  return (
    <div>
      <h3>Insights</h3>
      <p>Number of clients : {clients.length}</p>
      <p>Total balance of all clients : ${(totalBalance).toFixed(2)}</p>
      <p>Number of operations : {operations.length}</p>
      <br />
      <h3>List of operations</h3>
      <table >
        <thead>
          <tr>
            <th>Id</th>
            <th style={styles.date}className="date" >Date</th>
            <th>Operations</th>         
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
    </div>
  )
}

export default OperationsList
