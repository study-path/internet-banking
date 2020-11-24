import React, { useState } from 'react';

import data from '../data';
import AddClient from './AddClient';
import { OperationDeposite } from './Deposite/OperationDeposite';
import { OperationDepositeProvider } from './Deposite/OperationDepositeContext';
import DoDeposite from './DoDeposite';
import OperationsList from './OperationsList';

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
    alert(client)
  }

  return (   
      <section className="bank-area">
        <h2 style={styles.h2}>Bank Area</h2>
        <div className="button" style={styles.button}>
          <AddClient  addClient={addClient}/>
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
