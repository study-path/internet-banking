import React from 'react';

const styles={
  h2:{
    textAlign:'center'
  }
}


export default function ClientArea() {
  return (
   
      <section className="client-area">
      <h2 style={styles.h2}>Client Area</h2>
      <p>Petrov</p>
      <p>Balance</p>
     
      <button type="button" className="btn btn-success ">Transfer</button>  
      </section>
  
  )
}