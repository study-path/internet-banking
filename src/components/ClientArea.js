import React, { useEffect, useState } from 'react';

import { clientsRepository } from '../firebase/clientsRepository';

const styles={
  h2:{
    textAlign:'center'
  }
}

export default function ClientArea() {
  const [clients, setClients] = useState([]);
 
  useEffect( async () => {    
    const c = await clientsRepository.getClients();
    setClients(c);
  }, []);
  
  return (   
    <div>
      {clients.map((client) => (
        <section className="client-area" key={client.id}>
          <h2 style={styles.h2}>Client Area</h2>        
              <div>
                <p>{client.firstName}</p>
                <p>{client.lastName}</p>
                <p>{client.balance}</p>      
                <button type="button" className="btn btn-success ">Transfer</button>  
              </div>            
      </section>
      ))}
    </div>
  )
}
