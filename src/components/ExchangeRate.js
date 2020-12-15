import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import currencies from '../data/currencies';

const styles = { 
  td:{
    border: '1px solid #ddd',
    padding: '8px'
  }, 
  th:{
    padding: '8px',    
    textAlign: 'left',
    backgroundColor: '#007bff',
    color: 'white'
  },
  h2:{
      textAlign:'center'
  },
  h3:{
    textAlign:'center'
  },
}  

const TableStyle = styled.table`
  align-items: center;
  width:100%
`;

const API_KEY ="563fdce7dd744ea09119306c60402264"

const ExchangeRate = () => {
  const [currency, setCurrency] = useState({});
  const [rows, setRows] = useState([]);
  

  async function  gettingRate() {      
    const api_url  = await fetch(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}`);
    const data = await api_url.json();     
    console.log(data);  
    setCurrency(data);

    const rows = [];

    currencies.forEach((currency) => {
        var o = {};
        o.digitalCode = currency.digitalCode;
        o.letterCode = currency.letterCode;
        o.currencyName = currency.currencyName;
        o.rate = data.rates[currency.letterCode];
        rows.push(o);      
    })
    
    setRows(rows);
  }
  
  useEffect(async () => {
    await gettingRate();   
  }, [] );

  return (
    <div>      
        <h2 style={styles.h2}>Latest Currency Rates by USD</h2> 
        <h3 style={styles.h3}>{currency.date}  </h3> 
        {currency.date && 
         <TableStyle>  
            <thead>          
                <tr>
                  <th style={styles.th}>Digital code</th>
                  <th style={styles.th}>Letter code </th>
                  <th style={styles.th}>Currency name</th>  
                  <th style={styles.th}>Official rate</th>         
                </tr> 
            </thead>  
            <tbody>
              {rows.map((r, i)=>(
                <tr key={i}>
                  <td style={styles.td}>{r.digitalCode}</td>
                  <td style={styles.td}>{r.letterCode}</td>  
                  <td style={styles.td}>{r.currencyName}</td>
                  <td style={styles.td}>{r.rate}</td>
                </tr>
              ))}
            </tbody>
      </TableStyle>       
       }
    </div>
  )
}

export default ExchangeRate
