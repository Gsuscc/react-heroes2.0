import React from 'react';
import './Header.css';
import {useHistory} from 'react-router-dom'

const Header = () => {
  const history = useHistory();

const handleClick = () =>{
  history.push('/heroes');
}
  return (
    <div className="header" onClick={handleClick}>
      <div className="title">Heroes of React</div>
    </div>
  )
}

export default Header;
