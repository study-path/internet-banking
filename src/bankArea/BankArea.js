import React, { useState } from 'react';

import AddClient from '../bankArea/components/addClients/AddClient';
import { OperationDeposite } from '../bankArea/components/deposite/OperationDeposite';
import { OperationDepositeProvider } from '../bankArea/components/deposite/OperationDepositeContext';
import DoDeposite from '../bankArea/components/DoDeposite';
import OperationsList from '../bankArea/components/OperationsList';
import data from '../data';

const styles={
  h2:{
    textAlign:'center'
  },
  button:{
    width:'150px',
    display:'flex',
    flexDirection: 'column',
  },
  
}


export default function BankArea() {  
  const [operations, setOperation] = useState(data);

  function addClient(client){
    console.log(client)
  }

  return (   
      <section className="bank-area">
        <h2 style={styles.h2}>Bank Area</h2>
        <div className="button" style={styles.button}>
          <AddClient  addClientCallBack={addClient}/>
          <OperationDepositeProvider >
            <DoDeposite  toggle={() =>{}}/>
             <OperationDeposite /> 
          </OperationDepositeProvider>
          
          <button type="button" className="btn btn-success">Withdraw</button>  
        </div>
        <hr />
        <div>
          <h2 style={styles.h2}>Operations List</h2>
          <OperationsList  operations={operations} />  
        </div>
      </section>  
      
   
  )
}
