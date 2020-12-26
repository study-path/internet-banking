import React from 'react';


const styles = { 
  p:{
    margin: '0 auto',
    justifyContent: 'center',
    marginTop: '1rem'
   }
};

const Footer = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <p style={styles.p}>© Copyright 2020</p>
      </nav>
    </>
  )
}

export default Footer
