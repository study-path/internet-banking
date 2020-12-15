import React, { useEffect, useState } from 'react';

const Test1 = () => {

  const [val, setValue] = useState({
    input:'',
    items:[]
  });
  
  useEffect(() => {
    document.title = `Введеное слово: {val}`
  });

  function saveData(event){
    setValue({
      input:event.target.value,
      items: val.items
    })
  }

  function submitData(event){
    event.preventDefault();
    setValue({
      input: val.input,
      items: [...val.items, val.input]
    });
  }
 

  return (
    <div>
      <form onSubmit={submitData}>
        <input value={val.input} onChange={saveData} />
        <button type="submit">Submit</button>
      </form>      
      <ul>
        {val.items.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
     </ul> 
     <hr></hr>
     n
    </div>

    
  )
}

export default Test1
