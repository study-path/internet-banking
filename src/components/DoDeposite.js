import React from 'react';

import { useOperationDeposite } from './Deposite/OperationDepositeContext';

function DoDeposite() {
  const {show} = useOperationDeposite()
  return (
    <>
      <div>
        Component DO Deposite
      </div>
         <button onClick={() => show('This text is from DoDeposite.js')} type="button" className="btn btn-success">Deposit</button> 

    </>
  )
}

export default DoDeposite
