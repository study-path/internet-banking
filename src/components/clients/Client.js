import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { clientsRepository } from '../../firebase/clientsRepository';

const styles = { 
  h3:{
    textAlign:'center'
   }
}


const Client = (props) => { 
  const [client, setClient] = useState({}); 

  useEffect( () => { 
    async function fetchData(){     
      const c = await clientsRepository.getClient(props.match.params.clientId);
      setClient(c);
    } 
    fetchData();    
  }, []);

  return (
    <div>
      <h3 style={styles.h3}>Client information </h3>
      <p>First Name: {client.firstName}</p>
      <p>Last Name: {client.lastName}</p>
      <p>Balance: {client.balance}</p> 
      <NavLink to={`/clients/${props.match.params.clientId}/transfer`}>Transfer</NavLink> 
    </div>
  )  
}


export default Client
