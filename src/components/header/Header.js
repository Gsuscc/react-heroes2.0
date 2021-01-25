import React from 'react';
import './Header.css';
import {useHistory} from 'react-router-dom'
// import Santa from '../misc/Santa'

const Header = () => {
  const history = useHistory();

const handleClick = () =>{
  history.push('/');
}
  return (
    <div className="header" onClick={handleClick}>
      <div className="title">
      {/* Only for Winter use */}
        {/* <Santa/>  */} 
       Heroes of React
      </div>
    </div>
  )
}

export default Header;
