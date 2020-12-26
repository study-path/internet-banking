import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { clientsRepository } from '../../firebase/clientsRepository';

const styles={
  h2:{
    textAlign:'center'
  }
}
const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #EF00CF;   
    visited {
      color: green;
    }
  }  
`;
export default function Clients() {
  const [clients, setClients] = useState([]);
 
  useEffect( () => {  
    async function  fetchData(){
      const c = await clientsRepository.getClients();
      setClients(c);
    }
    fetchData();
  }, []);
  
  return (   
    <div>
      <h2 style={styles.h2}>Clients List </h2>   
      {clients.map((client) => (
        <div  key={client.id}>             
          <StyledLink className="nav-link" to={`/clients/${client.id}`}>{`${client.firstName} ${client.lastName}`}</StyledLink>        
          {/* <span>${client.balance.toFixed(2)}</span>         */}
      </div>
      ))}
    </div>
  )
}
