import React from 'react';

const styles={
  h2:{
    textAlign:'center'
  },
  button:{
    width: '150 px',
    display:'flex',
    flexDirection: 'column',
  },
  
}


 function OperationsList (props)  {
   return (
    <>    
       {       
       props.operations.map( (operation)=>{
        const {id, name, balance} = operation;
        return (
          <article key={id} className="client">                 
            <div>
              <h4>{name}</h4>
              <p>{balance} </p>
            </div>
          </article>
        )
        })               
      }         
    </> 
   )
  
}

export default OperationsList
