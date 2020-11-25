import React from 'react';

import { useOperationDeposite } from './OperationDepositeContext';



export  function OperationDeposite() {

  const operDeposite = useOperationDeposite()

  if (!operDeposite.visible) return null
  return (   
     <div onClick={operDeposite.hide}>{operDeposite.text}</div>
  )
}


