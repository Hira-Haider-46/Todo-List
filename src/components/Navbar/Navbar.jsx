import React from 'react';
import './Navbar.css';

function Navbar() {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <nav>
      <h1>To Do List</h1>
      <div className='date'>
        <span>Date:&nbsp;</span>
        <span>{getCurrentDate()}</span>
      </div>
    </nav>
  )
}

export default Navbar;