import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { clientsRepository } from '../firebase/clientsRepository';
import Test1 from '../Test1';
import AddClient from './AddClient';
import DoDeposit from './DoDeposit';
import Withdraw from './Withdraw';




const styles = { 
  h2:{
    textAlign:'center'
   }
}


export default function BankArea() {  
  // const [operations, setOperation] = useState(data);
  const history = useHistory();  

  async function addClient(client){    
    const clientId = await clientsRepository.generateClientId();
    client.id = clientId;
    clientsRepository.addClient(client);
    history.push('clients');
  }

  async function doDeposite(client){    
  } 

  async function doWithdraw(client){    
  } 

  return (  
    <section className="bank-area">  
      <h2 style={styles.h2}>Bank Area</h2>      
      <div>
        <AddClient  addClientCallBack={addClient} />
        <DoDeposit doDepositeCallBack={doDeposite} />    
        <Withdraw withdrawCallback={doWithdraw} />  
      </div>
      <hr />
      {/* <div>
        <h2 style={styles.h2}>Operations List</h2>
        <OperationsList  operations={operations} />  
      </div>   */}
      <hr /> 
      <div>
        <Test1 />
      </div>  
    </section>
  )
}
